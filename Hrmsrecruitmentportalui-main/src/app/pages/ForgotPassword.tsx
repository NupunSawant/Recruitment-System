import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-border rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h2 className="text-[16px] font-semibold text-foreground mb-2">Check your email</h2>
            <p className="text-[13px] text-muted-foreground mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="h-9 text-[13px]"
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary rounded-lg mb-3">
            <div className="w-10 h-10 bg-primary-foreground rounded flex items-center justify-center">
              <span className="text-primary font-bold text-xl">M</span>
            </div>
          </div>
          <h1 className="text-[22px] font-semibold text-foreground mb-1">Metaphi Innovations</h1>
          <p className="text-[13px] text-muted-foreground">Recruitment Management System</p>
        </div>

        {/* Reset form */}
        <div className="bg-white border border-border rounded-lg p-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to login
          </button>

          <h2 className="text-[16px] font-semibold text-foreground mb-2">Reset your password</h2>
          <p className="text-[13px] text-muted-foreground mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-[13px] text-foreground mb-2 block">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@metaphi.com"
                className="h-9 text-[13px]"
                required
              />
            </div>

            <Button type="submit" className="w-full h-9 text-[13px] bg-primary hover:bg-primary/90">
              Send reset instructions
            </Button>
          </form>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-6">
          © 2026 Metaphi Innovations. All rights reserved.
        </p>
      </div>
    </div>
  );
}
