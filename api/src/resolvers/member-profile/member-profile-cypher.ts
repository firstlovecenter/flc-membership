export const createMemberProfile = `
MATCH (fellowship:Fellowship {bankingCode: $fellowshipCode})
CREATE (member:Active:Member:IDL:Deer {whatsappNumber:$whatsappNumber})
      SET
      	member.id = apoc.create.uuid(),
      	member.firstName = $firstName,
      	member.middleName = $middleName,
      	member.lastName = $lastName,
      	member.email = $email,
      	member.phoneNumber = $phoneNumber,
        member.visitationArea = $visitationArea,
      	member.pictureUrl = $pictureUrl,
        member.registrationDate = datetime(),
        
        member.hasHolyGhostBaptism = false,
        member.hasWaterBaptism = false,
        member.graduatedUnderstandingSchools = [],
        member.hasAudioCollections = false,
        member.hasCampAttendance = false,
        member.hasBibleTranslations = false

      CREATE (log:HistoryLog:RegistrationLog)
        SET
        log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = $firstName +' ' +$lastName+' was registered on '+apoc.date.convertFormat(toString(date()), 'date', 'dd MMMM yyyy') + ' with ' + fellowship.name + ' Fellowship'

      WITH member, log
      MERGE (today:TimeGraph {date: date()})
      MERGE (date:TimeGraph {date: date($dob)})

      WITH member, log, today, date
      MATCH (maritalStatus:MaritalStatus {status:$maritalStatus})
      MATCH (gender:Gender {gender: $gender})
      MATCH (fellowship:Fellowship {id: $fellowship})

      MERGE (log)-[:RECORDED_ON]->(today)
      MERGE (log)-[:LOGGED_BY]->(member)
      MERGE (member)-[:HAS_HISTORY]->(log)
      MERGE (member)-[:HAS_MARITAL_STATUS]-> (maritalStatus)
      MERGE (member)-[:HAS_GENDER]-> (gender)
      MERGE (member)-[:WAS_BORN_ON]->(date)
      MERGE (member)-[:BELONGS_TO]->(fellowship)


      WITH member
         CALL {
         	WITH member
         	WITH member  WHERE $occupation IS NOT NULL
         	MERGE (occupation:Occupation {occupation:$occupation})
      	MERGE (member)-[:HAS_OCCUPATION]-> (occupation)
         	RETURN count(member) AS member_occupation
         	}

      WITH member
      CALL {
         	WITH member
         	WITH member  WHERE $ministry IS NOT NULL
         	MATCH (ministry:CreativeArts {id:$ministry})
      	MERGE (member)-[:BELONGS_TO]-> (ministry)
         	RETURN count(member) AS member_ministry
         	}

           MATCH (fellowship:Fellowship {id: $fellowship})
           MATCH (fellowship)<-[:HAS]-(bacenta:Bacenta)
          MATCH (bacenta:Bacenta)<-[:HAS]-(constituency:Constituency)<-[:HAS]-(council:Council)
           RETURN member  {.id, .firstName,.middleName,.lastName,.email,.phoneNumber,.whatsappNumber,
            fellowship:fellowship {.id,bacenta:bacenta{.id,constituency:constituency{.id}}}}
      `

export const checkMemberExists = `
    OPTIONAL MATCH (member:Member)
    WHERE member.email = $email 
    OR member.whatsappNumber = $whatsappNumber 
    RETURN member IS NOT NULL AS predicate, member AS member
`

export const updateMemberProfile = `
`
