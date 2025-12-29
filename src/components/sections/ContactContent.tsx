import { useState, useCallback, memo } from 'react';
import { Mail, Github, Linkedin, Send, Instagram, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

interface SocialLink {
  name: string;
  icon: typeof Github;
  url: string;
  color: string;
  username: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  { 
    name: 'GitHub', 
    icon: Github, 
    url: 'https://github.com/sr-857',
    color: 'hover:text-foreground focus:text-foreground',
    username: 'sr-857',
    ariaLabel: 'Visit GitHub profile',
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: 'https://linkedin.com/in/sr857',
    color: 'hover:text-blue-400 focus:text-blue-400',
    username: 'sr857',
    ariaLabel: 'Visit LinkedIn profile',
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    url: 'https://instagram.com/s.r_857',
    color: 'hover:text-pink-400 focus:text-pink-400',
    username: 's.r_857',
    ariaLabel: 'Visit Instagram profile',
  },
  { 
    name: 'Email', 
    icon: Mail, 
    url: 'mailto:subhajitroy857@gmail.com',
    color: 'hover:text-green-400 focus:text-green-400',
    username: 'subhajitroy857',
    ariaLabel: 'Send email',
  },
];

// Memoized social link component
const SocialLinkCard = memo(({ link }: { link: SocialLink }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.ariaLabel}
    className={`
      flex items-center gap-2 p-2.5 rounded-lg
      bg-muted/50 border border-border
      transition-all duration-200
      hover:bg-muted hover:border-primary/50 hover:scale-[1.02]
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
      ${link.color}
    `}
  >
    <link.icon className="w-4 h-4" aria-hidden="true" />
    <div className="flex flex-col">
      <span className="text-xs font-medium text-foreground">{link.name}</span>
      <span className="text-[10px] text-muted-foreground">@{link.username}</span>
    </div>
  </a>
));
SocialLinkCard.displayName = 'SocialLinkCard';

// Form input component with error handling
interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  maxLength: number;
  disabled?: boolean;
}

const FormInput = memo(({ id, label, type = 'text', value, onChange, error, placeholder, maxLength, disabled }: FormInputProps) => (
  <div>
    <label htmlFor={id} className="block text-xs text-muted-foreground mb-1 font-mono">
      {label}:
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`
        w-full px-3 py-2 rounded-lg bg-muted border text-foreground text-sm 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-primary'}
      `}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={type === 'email' ? 'email' : 'name'}
    />
    {error && (
      <p id={`${id}-error`} className="flex items-center gap-1 mt-1 text-xs text-destructive" role="alert">
        <AlertCircle className="w-3 h-3" aria-hidden="true" />
        {error}
      </p>
    )}
  </div>
));
FormInput.displayName = 'FormInput';

const ContactContent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = useCallback((field: keyof ContactFormData, value: string): string | undefined => {
    try {
      contactSchema.shape[field].parse(value);
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message;
      }
      return 'Invalid input';
    }
  }, []);

  const handleFieldChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setIsSuccess(false);
  }, [errors]);

  const handleFieldBlur = useCallback((field: keyof ContactFormData) => {
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      
      // Focus first error field
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="h-full overflow-auto p-5 bg-gradient-to-br from-card to-background"
      aria-labelledby="contact-heading"
    >
      {/* Header */}
      <header className="mb-4">
        <h2 id="contact-heading" className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="text-primary font-mono" aria-hidden="true">{">"}</span>
          Initialize Connection
        </h2>
        <p className="text-xs text-muted-foreground font-mono mt-1" aria-hidden="true">
          $ ssh guest@subhajit.dev
        </p>
      </header>

      {/* Social Links */}
      <section className="glass-panel rounded-xl p-4 mb-4" aria-labelledby="quick-connect-heading">
        <h3 id="quick-connect-heading" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="text-cyan-400" aria-hidden="true">⚡</span> Quick Connect
        </h3>
        <nav aria-label="Social media links">
          <ul className="grid grid-cols-2 gap-2" role="list">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <SocialLinkCard link={link} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Location */}
        <div className="mt-3 p-2 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground font-mono">
            <span aria-hidden="true">📍</span>
            <span className="sr-only">Location:</span> Assam, India
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="glass-panel-glow rounded-xl p-4" aria-labelledby="message-form-heading">
        <h3 id="message-form-heading" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className={isSuccess ? 'text-green-400' : 'text-green-500'} aria-hidden="true">●</span> 
          Secure Message Channel
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <FormInput
            id="name"
            label="name"
            value={formData.name}
            onChange={(value) => handleFieldChange('name', value)}
            error={errors.name}
            placeholder="Enter your name"
            maxLength={100}
            disabled={isSubmitting}
          />

          <FormInput
            id="email"
            label="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            error={errors.email}
            placeholder="you@example.com"
            maxLength={255}
            disabled={isSubmitting}
          />

          <div>
            <label htmlFor="message" className="block text-xs text-muted-foreground mb-1 font-mono">
              message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              onBlur={() => handleFieldBlur('message')}
              disabled={isSubmitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : 'message-counter'}
              className={`
                w-full px-3 py-2 rounded-lg bg-muted border text-foreground text-sm 
                transition-all duration-200 resize-none
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background
                disabled:opacity-50 disabled:cursor-not-allowed
                ${errors.message ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-primary'}
              `}
              placeholder="Your message (minimum 10 characters)..."
              rows={3}
              maxLength={1000}
            />
            {errors.message ? (
              <p id="message-error" className="flex items-center gap-1 mt-1 text-xs text-destructive" role="alert">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                {errors.message}
              </p>
            ) : (
              <p id="message-counter" className="text-right text-[10px] text-muted-foreground mt-0.5">
                {formData.message.length}/1000 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
              font-medium text-sm transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              ${isSubmitting 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : isSuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-primary-foreground hover:brightness-110'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div 
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" 
                  aria-hidden="true"
                />
                <span>Transmitting...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

        {/* Terminal hint */}
        <div className="mt-3 font-mono text-[10px] text-muted-foreground border-t border-border pt-2" aria-hidden="true">
          <span className="text-green-400">→</span> Connection encrypted with TLS 1.3
        </div>
      </section>
    </section>
  );
};

export default ContactContent;
