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

MATCH (fellowship:Fellowship)
RETURN fellowship.bankingCode;

MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        AND record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
RETURN  pastor.firstName, pastor.lastName, SUM(record.income) AS notBanked ORDER BY pastor.firstName, pastor.lastName