MATCH (member:Member {email: "flsssmgcampaigns@gmail.com"})
DETACH DELETE member;

MATCH (member:Member {email: "flsssmgcampaigns@gmail.com"})
MATCH (fellowship:Fellowship {bankingCode: 113})
       MATCH (member)-[:WAS_BORN_ON]->(dob:TimeGraph)
       MATCH (member)-[:HAS_GENDER]->(gender:Gender)
       MATCH (member)-[:HAS_MARITAL_STATUS]->(maritalStatus:MaritalStatus)


    RETURN member 
       {
         .id, 
         .firstName,
         .middleName,
         .lastName,
         .email,
         .phoneNumber,
         .whatsappNumber,
         fellowship:fellowship {
           .id, 
           .name, 
           .bankingCode
         },
         dob:dob {
           .date
         },
         gender: gender {
           .gender
         },
         maritalStatus: maritalStatus {
           .status
         }
       }
