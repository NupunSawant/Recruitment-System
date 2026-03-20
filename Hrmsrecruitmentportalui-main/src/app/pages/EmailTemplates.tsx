import { useState } from 'react';
import { Save, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface EmailTemplate {
  subject: string;
  body: string;
}

export function EmailTemplates() {
  const [rejectionTemplate, setRejectionTemplate] = useState<EmailTemplate>({
    subject: 'Update on your application at Metaphi Innovations',
    body: `Dear {{candidate_name}},

Thank you for your interest in the {{role}} position at Metaphi Innovations and for taking the time to interview with us.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate the time and effort you invested in the application process and wish you the best in your job search and future endeavors.

Best regards,
Metaphi Innovations Recruitment Team`
  });

  const [offerTemplate, setOfferTemplate] = useState<EmailTemplate>({
    subject: 'Offer Letter - {{role}} at Metaphi Innovations',
    body: `Dear {{candidate_name}},

We are pleased to extend an offer of employment for the position of {{role}} at Metaphi Innovations.

Offer Details:
- Position: {{role}}
- Annual CTC: {{offered_ctc}}
- Joining Date: {{joining_date}}
- Location: {{location}}

Please find the detailed offer letter attached to this email. Kindly review and sign the document to confirm your acceptance.

We look forward to welcoming you to our team!

Best regards,
Metaphi Innovations HR Team`
  });

  const [joiningTemplate, setJoiningTemplate] = useState<EmailTemplate>({
    subject: 'Welcome to Metaphi Innovations - Joining Instructions',
    body: `Dear {{candidate_name}},

Welcome to Metaphi Innovations! We are excited to have you join our team as {{role}}.

Your joining date is scheduled for {{joining_date}}.

Joining Day Instructions:
- Report to our office at 10:00 AM
- Bring original documents for verification (ID proof, educational certificates, experience letters)
- Bring passport-size photographs

Your onboarding coordinator will reach out to you shortly with more details.

Looking forward to seeing you!

Best regards,
Metaphi Innovations HR Team`
  });

  const handleSaveTemplate = (templateType: string) => {
    // Mock save action
    alert(`${templateType} template saved successfully`);
  };

  return (
    <div className="h-full overflow-auto bg-muted">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[18px] font-semibold text-foreground mb-1">Email Templates</h1>
          <p className="text-[13px] text-muted-foreground">
            Manage email templates for candidate communication
          </p>
        </div>

        {/* Templates */}
        <div className="bg-white border border-border rounded-md">
          <Tabs defaultValue="rejection" className="p-6">
            <TabsList className="bg-muted/50 p-1 mb-6">
              <TabsTrigger value="rejection" className="text-[13px] px-4 py-2">
                <Mail className="w-3.5 h-3.5 mr-2" />
                Rejection Email
              </TabsTrigger>
              <TabsTrigger value="offer" className="text-[13px] px-4 py-2">
                <Mail className="w-3.5 h-3.5 mr-2" />
                Offer Email
              </TabsTrigger>
              <TabsTrigger value="joining" className="text-[13px] px-4 py-2">
                <Mail className="w-3.5 h-3.5 mr-2" />
                Joining Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rejection" className="space-y-4">
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Subject</Label>
                <Input
                  value={rejectionTemplate.subject}
                  onChange={(e) =>
                    setRejectionTemplate({ ...rejectionTemplate, subject: e.target.value })
                  }
                  className="h-9 text-[13px]"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Email Body</Label>
                <Textarea
                  value={rejectionTemplate.body}
                  onChange={(e) =>
                    setRejectionTemplate({ ...rejectionTemplate, body: e.target.value })
                  }
                  className="min-h-[300px] text-[13px] font-mono resize-none"
                />
                <p className="text-[11px] text-muted-foreground mt-2">
                  Available placeholders: {`{{candidate_name}}, {{role}}`}
                </p>
              </div>
              <Button
                onClick={() => handleSaveTemplate('Rejection')}
                className="h-9 text-[13px] gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Template
              </Button>
            </TabsContent>

            <TabsContent value="offer" className="space-y-4">
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Subject</Label>
                <Input
                  value={offerTemplate.subject}
                  onChange={(e) => setOfferTemplate({ ...offerTemplate, subject: e.target.value })}
                  className="h-9 text-[13px]"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Email Body</Label>
                <Textarea
                  value={offerTemplate.body}
                  onChange={(e) => setOfferTemplate({ ...offerTemplate, body: e.target.value })}
                  className="min-h-[300px] text-[13px] font-mono resize-none"
                />
                <p className="text-[11px] text-muted-foreground mt-2">
                  Available placeholders: {`{{candidate_name}}, {{role}}, {{offered_ctc}}, {{joining_date}}, {{location}}`}
                </p>
              </div>
              <Button
                onClick={() => handleSaveTemplate('Offer')}
                className="h-9 text-[13px] gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Template
              </Button>
            </TabsContent>

            <TabsContent value="joining" className="space-y-4">
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Subject</Label>
                <Input
                  value={joiningTemplate.subject}
                  onChange={(e) =>
                    setJoiningTemplate({ ...joiningTemplate, subject: e.target.value })
                  }
                  className="h-9 text-[13px]"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Email Body</Label>
                <Textarea
                  value={joiningTemplate.body}
                  onChange={(e) => setJoiningTemplate({ ...joiningTemplate, body: e.target.value })}
                  className="min-h-[300px] text-[13px] font-mono resize-none"
                />
                <p className="text-[11px] text-muted-foreground mt-2">
                  Available placeholders: {`{{candidate_name}}, {{role}}, {{joining_date}}`}
                </p>
              </div>
              <Button
                onClick={() => handleSaveTemplate('Joining')}
                className="h-9 text-[13px] gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Template
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}