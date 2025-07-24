import React, { useState } from 'react';
import { XIcon, UserIcon, BuildingIcon, MailIcon, PhoneIcon, GlobeIcon } from 'lucide-react';

export const CreateClientModal = ({ onClose, onClientCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    address: '',
    notes: '',
    portalAccess: true,
    primaryColor: '#f97316'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const newClient = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        workspaceId: 'workspace-1',
        portalAccess: formData.portalAccess,
        portalTheme: {
          primaryColor: formData.primaryColor
        },
        accessibleProjects: [],
        website: formData.website || undefined,
        address: formData.address || undefined,
        notes: formData.notes || undefined
      };

      onClientCreated(newClient);
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to create client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="modal-base max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">Add New Client</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    className="input-base pl-10 w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                    className="input-base pl-10 w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Company *</label>
                <div className="relative">
                  <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Company Inc."
                    className="input-base pl-10 w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="input-base pl-10 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
                <div className="relative">
                  <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://company.com"
                    className="input-base pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main St, City, State 12345"
                  rows={2}
                  className="input-base w-full resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about this client..."
                  rows={3}
                  className="input-base w-full resize-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Portal Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="portalAccess"
                  checked={formData.portalAccess}
                  onChange={(e) => setFormData(prev => ({ ...prev, portalAccess: e.target.checked }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border-interactive rounded"
                />
                <label htmlFor="portalAccess" className="ml-2 block text-sm text-text-primary">
                  Enable client portal access
                </label>
              </div>

              {formData.portalAccess && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Portal Theme Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 border border-border-interactive rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="input-base flex-1"
                      placeholder="#f97316"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-primary">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Client'}
          </button>
        </div>
      </div>
    </div>
  );
};
