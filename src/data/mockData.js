export const mockCompanies = [
    {
      id: 1,
      name: "Tech Corp",
      location: "San Francisco, CA",
      linkedInProfile: "linkedin.com/company/techcorp",
      emails: ["contact@techcorp.com"],
      phoneNumbers: ["123-456-7890"],
      comments: "Key technology partner",
      communicationPeriodicity: 14, 
      communications: [
        {
          type: "LinkedIn Post",
          date: "2024-12-20",
          notes: "Shared their latest product launch"
        }
      ]
    },
    
  ]
  
  export const mockCommunicationMethods = [
    {
      id: 1,
      name: "LinkedIn Post",
      description: "Share or interact with company posts",
      sequence: 1,
      isMandatory: true
    },
    {
      id: 2,
      name: "LinkedIn Message",
      description: "Direct message to company representatives",
      sequence: 2,
      isMandatory: false
    },
    {
      id: 3,
      name: "Email",
      description: "Email communication",
      sequence: 3,
      isMandatory: true
    },
    {
      id: 4,
      name: "Phone Call",
      description: "Direct phone communication",
      sequence: 4,
      isMandatory: false
    },
    {
      id: 5,
      name: "Other",
      description: "Other forms of communication",
      sequence: 5,
      isMandatory: false
    }
  ]