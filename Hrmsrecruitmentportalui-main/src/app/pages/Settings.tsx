import { Save, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';

export function Settings() {
  const [companyName, setCompanyName] = useState('Metaphi Innovations');
  const [emailFromName, setEmailFromName] = useState('Metaphi Recruitment');
  const [emailFromAddress, setEmailFromAddress] = useState('recruitment@metaphi.com');
  const [autoAssignInterviewer, setAutoAssignInterviewer] = useState(true);
  const [sendAutoResponses, setSendAutoResponses] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);

  const handleSave = () => {
    alert('Settings saved successfully');
  };

  return (
    <div className="h-full overflow-auto bg-muted">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[18px] font-semibold text-foreground mb-1">Settings</h1>
          <p className="text-[13px] text-muted-foreground">
            Configure system preferences and company branding
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white border border-border rounded-md">
          <Tabs defaultValue="branding" className="p-6">
            <TabsList className="bg-muted/50 p-1 mb-6">
              <TabsTrigger value="branding" className="text-[13px] px-4 py-2">
                Company Branding
              </TabsTrigger>
              <TabsTrigger value="workflow" className="text-[13px] px-4 py-2">
                Workflow Settings
              </TabsTrigger>
              <TabsTrigger value="system" className="text-[13px] px-4 py-2">
                System Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Company Name</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-9 text-[13px] max-w-md"
                />
              </div>

              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">M</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-[13px] gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Recommended size: 256x256px, PNG or SVG format
                </p>
              </div>

              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    defaultValue="#0891b2"
                    className="w-12 h-9 rounded border border-border cursor-pointer"
                  />
                  <span className="text-[13px] text-muted-foreground">#0891b2</span>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="h-9 text-[13px] gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  Save Branding Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <div className="text-[13px] font-medium text-foreground mb-1">
                      Auto-assign Interviewer
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      Automatically assign interviewers when candidates move to screening stage
                    </div>
                  </div>
                  <Switch
                    checked={autoAssignInterviewer}
                    onCheckedChange={setAutoAssignInterviewer}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <div className="text-[13px] font-medium text-foreground mb-1">
                      Send Auto-response Emails
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      Send automatic acknowledgment emails when applications are received
                    </div>
                  </div>
                  <Switch checked={sendAutoResponses} onCheckedChange={setSendAutoResponses} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <div className="text-[13px] font-medium text-foreground mb-1">
                      Require Approval for Offers
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      Require manager approval before sending offer letters
                    </div>
                  </div>
                  <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
                </div>

                <div className="pt-2">
                  <Label className="text-[11px] text-muted-foreground mb-2 block">
                    Default Notice Period
                  </Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-48 h-9 text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[11px] text-muted-foreground mb-2 block">
                    Default Pipeline Stages
                  </Label>
                  <div className="space-y-2">
                    {['New', 'Screening', 'Technical', 'Offer', 'Rejected'].map((stage) => (
                      <div
                        key={stage}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded text-[13px]"
                      >
                        <span>{stage}</span>
                        <span className="text-muted-foreground text-[11px]">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="h-9 text-[13px] gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  Save Workflow Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">
                  Email From Name
                </Label>
                <Input
                  value={emailFromName}
                  onChange={(e) => setEmailFromName(e.target.value)}
                  className="h-9 text-[13px] max-w-md"
                />
              </div>

              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">
                  Email From Address
                </Label>
                <Input
                  type="email"
                  value={emailFromAddress}
                  onChange={(e) => setEmailFromAddress(e.target.value)}
                  className="h-9 text-[13px] max-w-md"
                />
              </div>

              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="w-64 h-9 text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[11px] text-muted-foreground mb-2 block">Date Format</Label>
                <Select defaultValue="yyyy-mm-dd">
                  <SelectTrigger className="w-64 h-9 text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="h-9 text-[13px] gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  Save System Preferences
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
