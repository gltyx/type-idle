const wordsList = {
    "ability": {
        "definition": "possession of the means or skill to do something",
        "example": "Her ability to solve complex problems quickly impressed everyone."
    },
    "able": {
        "definition": "having the power, skill, means, or opportunity to do something",
        "example": "He was able to finish the marathon despite the pain."
    },
    "about": {
        "definition": "on the subject of; concerning",
        "example": "She is reading a book about ancient civilizations."
    },
    "above": {
        "definition": "at a higher level or layer",
        "example": "The airplane flew above the clouds."
    },
    "accept": {
        "definition": "consent to receive or undertake (something offered)",
        "example": "She decided to accept the job offer."
    },
    "according": {
        "definition": "as stated by or in",
        "example": "According to the weather forecast, it will rain tomorrow."
    },
    "account": {
        "definition": "a report or description of an event or experience",
        "example": "He gave a detailed account of his travels."
    },
    "across": {
        "definition": "from one side to the other",
        "example": "They walked across the bridge."
    },
    "action": {
        "definition": "the fact or process of doing something, typically to achieve an aim",
        "example": "The government promised swift action to tackle the problem."
    },
    "activity": {
        "definition": "the condition in which things are happening or being done",
        "example": "Physical activity is essential for good health."
    },
    "actually": {
        "definition": "as the truth or facts of a situation; really",
        "example": "She was surprised to find that he was actually quite nice."
    },
    "addition": {
        "definition": "the action or process of adding something to something else",
        "example": "The addition of spices improved the flavor of the dish."
    },
    "address": {
        "definition": "the particulars of the place where someone lives or an organization is situated",
        "example": "She wrote the address on the envelope."
    },
    "administration": {
        "definition": "the process or activity of running a business, organization, etc.",
        "example": "The administration of the company decided to implement new policies."
    },
    "admit": {
        "definition": "confess to be true or to be the case",
        "example": "He had to admit that he was wrong."
    },
    "adult": {
        "definition": "a person who is fully grown or developed",
        "example": "As an adult, he took on more responsibilities."
    },
    "affect": {
        "definition": "have an effect on; make a difference to",
        "example": "The new law will affect thousands of people."
    },
    "after": {
        "definition": "in the time following an event or another period of time",
        "example": "They went for a walk after dinner."
    },
    "again": {
        "definition": "another time; once more",
        "example": "She read the book again."
    },
    "against": {
        "definition": "in opposition to",
        "example": "The players were determined to win against all odds."
    },
    "agency": {
        "definition": "a business or organization providing a particular service",
        "example": "They hired an agency to help with the marketing campaign."
    },
    "agent": {
        "definition": "a person who acts on behalf of another",
        "example": "She contacted her agent to discuss her next project."
    },
    "agreement": {
        "definition": "harmony or accordance in opinion or feeling",
        "example": "They finally reached an agreement after hours of negotiation."
    },
    "ahead": {
        "definition": "in or toward the front",
        "example": "He looked ahead and saw the finish line."
    },
    "air": {
        "definition": "the invisible gaseous substance surrounding the earth, a mixture mainly of oxygen and nitrogen",
        "example": "The fresh air felt invigorating."
    },
    "all": {
        "definition": "used to refer to the whole quantity or extent of a particular group or thing",
        "example": "She ate all the cookies."
    },
    "allow": {
        "definition": "give (someone) permission to do something",
        "example": "The teacher decided to allow the students extra time to complete the test."
    },
    "almost": {
        "definition": "not quite; very nearly",
        "example": "She almost missed the bus."
    },
    "alone": {
        "definition": "having no one else present; on one's own",
        "example": "He felt alone in the big city."
    },
    "along": {
        "definition": "moving in a constant direction on (a path or any more or less horizontal surface)",
        "example": "They walked along the beach."
    },
    "already": {
        "definition": "before or by now or the time in question",
        "example": "She was already at the office when I arrived."
    },
    "also": {
        "definition": "in addition; too",
        "example": "She enjoys swimming and also likes to play tennis."
    },
    "although": {
        "definition": "in spite of the fact that; even though",
        "example": "Although it was raining, they went for a hike."
    },
    "always": {
        "definition": "at all times; on all occasions",
        "example": "She always remembers my birthday."
    },
    "American": {
        "definition": "relating to or characteristic of the United States or its inhabitants",
        "example": "She loves American culture and traditions."
    },
    "among": {
        "definition": "surrounded by; in the company of",
        "example": "He found himself among friends at the party."
    },
    "amount": {
        "definition": "a quantity of something",
        "example": "She measured the amount of sugar needed for the recipe."
    },
    "analysis": {
        "definition": "detailed examination of the elements or structure of something",
        "example": "The scientist's analysis of the data revealed important findings."
    },
    "animal": {
        "definition": "a living organism that feeds on organic matter, typically having specialized sense organs and nervous system",
        "example": "The animal roamed freely in the forest."
    },
    "another": {
        "definition": "used to refer to an additional person or thing of the same type as one already mentioned or known",
        "example": "She decided to have another cup of coffee."
    },
    "answer": {
        "definition": "a thing said, written, or done to deal with or as a reaction to a question, statement, or situation",
        "example": "He waited for an answer to his question."
    },
    "anyone": {
        "definition": "any person or people",
        "example": "Anyone can join the club if they are interested."
    },
    "anything": {
        "definition": "used to refer to a thing, no matter what",
        "example": "She couldn't find anything in the messy drawer."
    },
    "appear": {
        "definition": "come into sight; become visible or noticeable",
        "example": "The sun began to appear over the horizon."
    },
    "apply": {
        "definition": "make a formal application or request",
        "example": "He decided to apply for the scholarship."
    },
    "approach": {
        "definition": "come near or nearer to (someone or something) in distance or time",
        "example": "The cat cautiously approached the bird."
    },
    "area": {
        "definition": "a region or part of a town, a country, or the world",
        "example": "They explored the area around the city."
    },
    "argue": {
        "definition": "give reasons or cite evidence in support of an idea, action, or theory, typically with the aim of persuading others to share one's view",
        "example": "They often argue about politics."
    },
    "arm": {
        "definition": "each of the two upper limbs of the human body from the shoulder to the hand",
        "example": "He injured his arm while playing soccer."
    },
    "around": {
        "definition": "located or situated on every side",
        "example": "They sat around the campfire."
    },
    "arrive": {
        "definition": "reach a place at the end of a journey or a stage in a journey",
        "example": "She was excited to finally arrive at the destination."
    },
    "article": {
        "definition": "a piece of writing included with others in a newspaper, magazine, or other publication",
        "example": "He wrote an article about the latest technology trends."
    },
    "artist": {
        "definition": "a person who creates paintings or drawings as a profession or hobby",
        "example": "The artist displayed her work at the gallery."
    },
    "as": {
        "definition": "used in comparisons to refer to the extent or degree of something",
        "example": "She is as tall as her brother."
    },
    "ask": {
        "definition": "say something in order to obtain an answer or some information",
        "example": "She decided to ask for directions."
    },
    "assume": {
        "definition": "suppose to be the case, without proof",
        "example": "He tends to assume the worst in every situation."
    },
    "at": {
        "definition": "expressing location or arrival in a particular place or position",
        "example": "They are waiting at the bus stop."
    },
    "attention": {
        "definition": "notice taken of someone or something; the regarding of someone or something as interesting or important",
        "example": "The teacher called for the students' attention."
    },
    "author": {
        "definition": "a writer of a book, article, or report",
        "example": "She is the author of several bestselling novels."
    },
    "available": {
        "definition": "able to be used or obtained; at someone's disposal",
        "example": "The product is available in different colors."
    },
    "avoid": {
        "definition": "keep away from or stop oneself from doing (something)",
        "example": "He tried to avoid making the same mistake again."
    },
    "away": {
        "definition": "to or at a distance from a particular place, person, or thing",
        "example": "They moved away from the noisy city."
    },
    "baby": {
        "definition": "a very young child, especially one newly or recently born",
        "example": "The baby giggled happily."
    },
    "back": {
        "definition": "the rear surface of the human body from the shoulders to the hips",
        "example": "He had a tattoo on his back."
    },
    "bad": {
        "definition": "of poor quality or a low standard",
        "example": "The food at the restaurant was really bad."
    },
    "bag": {
        "definition": "a flexible container with an opening at the top, used for carrying things",
        "example": "She packed her bag for the trip."
    },
    "ball": {
        "definition": "a solid or hollow spherical or egg-shaped object that is kicked, thrown, or hit in a game",
        "example": "They played catch with a ball in the park."
    },
    "bank": {
        "definition": "the land alongside or sloping down to a river or lake",
        "example": "They sat on the bank of the river."
    },
    "bar": {
        "definition": "a long rod or rigid piece of wood, metal, or similar material, typically used as an obstruction, fastening, or weapon",
        "example": "The window was secured with an iron bar."
    },
    "base": {
        "definition": "the lowest part or edge of something, especially the part on which it rests or is supported",
        "example": "The lamp had a sturdy base."
    },
    "be": {
        "definition": "exist",
        "example": "She will be here soon."
    },
    "beat": {
        "definition": "strike (a person or an animal) repeatedly and violently so as to hurt or injure them",
        "example": "He managed to beat the high score."
    },
    "beautiful": {
        "definition": "pleasing the senses or mind aesthetically",
        "example": "The sunset over the ocean was beautiful."
    },
    "because": {
        "definition": "for the reason that; since",
        "example": "She was late because of the traffic."
    },
    "become": {
        "definition": "begin to be",
        "example": "He wants to become a doctor when he grows up."
    },
    "before": {
        "definition": "during the period of time preceding (a particular event or time)",
        "example": "She had never seen a rainbow before."
    },
    "begin": {
        "definition": "start; perform or undergo the first part of (an action or activity)",
        "example": "They decided to begin the project immediately."
    },
    "behavior": {
        "definition": "the way in which one acts or conducts oneself, especially toward others",
        "example": "Her behavior at the meeting was very professional."
    },
    "behind": {
        "definition": "at or to the back of",
        "example": "She left her phone behind."
    },
    "believe": {
        "definition": "accept (something) as true; feel sure of the truth of",
        "example": "He couldn't believe his eyes."
    },
    "benefit": {
        "definition": "an advantage or profit gained from something",
        "example": "There are many benefits to eating healthy."
    },
    "best": {
        "definition": "of the most excellent or desirable type or quality",
        "example": "She is the best singer in the group."
    },
    "better": {
        "definition": "of a more excellent or effective type or quality",
        "example": "He is feeling better after taking the medicine."
    },
    "between": {
        "definition": "at, into, or across the space separating (two objects or regions)",
        "example": "She sat between her friends."
    },
    "beyond": {
        "definition": "at or to the further side of",
        "example": "The house is beyond the hill."
    },
    "big": {
        "definition": "of considerable size, extent, or intensity",
        "example": "They bought a big house in the countryside."
    },
    "bill": {
        "definition": "a printed or written statement of the money owed for goods or services",
        "example": "He paid the electricity bill online."
    },
    "billion": {
        "definition": "the number equivalent to the product of a thousand million",
        "example": "The company is worth several billion dollars."
    },
    "bit": {
        "definition": "a small piece, part, or quantity of something",
        "example": "He took a bit of the chocolate cake."
    },
    "black": {
        "definition": "of the very darkest color owing to the absence of or complete absorption of light; the opposite of white",
        "example": "She wore a black dress to the party."
    },
    "blood": {
        "definition": "the red liquid that circulates in the arteries and veins of humans and other vertebrate animals, carrying oxygen to and carbon dioxide from the tissues of the body",
        "example": "He donated blood at the hospital."
    },
    "blue": {
        "definition": "of a color intermediate between green and violet, as of the sky or sea on a sunny day",
        "example": "The sky was a clear, bright blue."
    },
    "board": {
        "definition": "a long, thin, flat piece of wood or other hard material, used for floors or other building purposes",
        "example": "They replaced the old board on the deck."
    },
    "body": {
        "definition": "the physical structure of a person or an animal, including the bones, flesh, and organs",
        "example": "He took good care of his body by exercising regularly."
    },
    "book": {
        "definition": "a written or printed work consisting of pages glued or sewn together along one side and bound in covers",
        "example": "She borrowed a book from the library."
    },
    "born": {
        "definition": "brought into life",
        "example": "She was born in a small village."
    },
    "both": {
        "definition": "used to refer to two people or things, regarded and identified together",
        "example": "Both of them enjoyed the movie."
    },
    "box": {
        "definition": "a container with a flat base and sides, typically square or rectangular and having a lid",
        "example": "She opened the box to see what was inside."
    },
    "boy": {
        "definition": "a male child or youth",
        "example": "The boy played with his toys."
    },
    "break": {
        "definition": "separate or cause to separate into pieces as a result of a blow, shock, or strain",
        "example": "She managed to break the old record."
    },
    "bring": {
        "definition": "take or go with (someone or something) to a place",
        "example": "He decided to bring a gift to the party."
    },
    "brother": {
        "definition": "a man or boy in relation to other sons and daughters of his parents",
        "example": "She has a younger brother."
    },
    "budget": {
        "definition": "an estimate of income and expenditure for a set period of time",
        "example": "They planned their budget for the upcoming year."
    },
    "build": {
        "definition": "construct (something) by putting parts or material together",
        "example": "They decided to build a new house."
    },
    "building": {
        "definition": "a structure with a roof and walls, such as a house or factory",
        "example": "The new office building is very modern."
    },
    "business": {
        "definition": "a person's regular occupation, profession, or trade",
        "example": "He started his own business last year."
    },
    "but": {
        "definition": "used to introduce a phrase or clause contrasting with what has already been mentioned",
        "example": "She wanted to go, but she had to work."
    },
    "buy": {
        "definition": "obtain in exchange for payment",
        "example": "They decided to buy a new car."
    },
    "by": {
        "definition": "identifying the agent performing an action",
        "example": "The book was written by a famous author."
    },
    "call": {
        "definition": "cry out (a word or words)",
        "example": "She decided to call her friend to chat."
    },
    "camera": {
        "definition": "a device for recording visual images in the form of photographs, film, or video signals",
        "example": "He bought a new camera for his trip."
    },
    "campaign": {
        "definition": "an organized course of action to achieve a goal",
        "example": "They launched a campaign to raise awareness about the issue."
    },
    "can": {
        "definition": "be able to",
        "example": "She can speak three languages fluently."
    },
    "cancer": {
        "definition": "a disease caused by an uncontrolled division of abnormal cells in a part of the body",
        "example": "They are conducting research to find a cure for cancer."
    },
    "candidate": {
        "definition": "a person who applies for a job or is nominated for election",
        "example": "She is a candidate for the upcoming elections."
    },
    "capital": {
        "definition": "the city or town that functions as the seat of government and administrative center of a country or region",
        "example": "They visited the capital city during their vacation."
    },
    "car": {
        "definition": "a road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people",
        "example": "He bought a new car for his daily commute."
    },
    "card": {
        "definition": "a small rectangular piece of thick paper or plastic, typically used for writing or printing on",
        "example": "He handed her a business card."
    },
    "care": {
        "definition": "the provision of what is necessary for the health, welfare, maintenance, and protection of someone or something",
        "example": "She takes great care of her pets."
    },
    "career": {
        "definition": "an occupation undertaken for a significant period of a person's life and with opportunities for progress",
        "example": "He chose a career in medicine."
    },
    "carry": {
        "definition": "support and move (someone or something) from one place to another",
        "example": "She decided to carry the heavy box herself."
    },
    "case": {
        "definition": "an instance of a particular situation; an example of something occurring",
        "example": "In this case, we need to rethink our strategy."
    },
    "catch": {
        "definition": "capture or seize, especially after a chase",
        "example": "He managed to catch the last train."
    },
    "cause": {
        "definition": "a person or thing that gives rise to an action, phenomenon, or condition",
        "example": "The cause of the fire is still unknown."
    },
    "cell": {
        "definition": "the smallest structural and functional unit of an organism, typically microscopic and consisting of cytoplasm and a nucleus enclosed in a membrane",
        "example": "The scientist studied the structure of the cell."
    },
    "center": {
        "definition": "the point that is equally distant from every point on the circumference of a circle or sphere",
        "example": "They met at the center of the park."
    },
    "central": {
        "definition": "of, at, or forming the center",
        "example": "The central issue in the debate was economic policy."
    },
    "century": {
        "definition": "a period of one hundred years",
        "example": "The building has stood for over a century."
    },
    "certain": {
        "definition": "able to be firmly relied on to happen or be the case",
        "example": "She was certain that she had locked the door."
    },
    "certainly": {
        "definition": "used to emphasize the speaker's belief that what is said is true",
        "example": "He is certainly the best candidate for the job."
    },
    "chair": {
        "definition": "a separate seat for one person, typically with a back and four legs",
        "example": "She sat on the chair by the window."
    },
    "chance": {
        "definition": "a possibility of something happening",
        "example": "There is a chance of rain tomorrow."
    },
    "change": {
        "definition": "make or become different",
        "example": "They decided to change their plans at the last minute."
    },
    "character": {
        "definition": "the mental and moral qualities distinctive to an individual",
        "example": "He has a strong character and is very reliable."
    },
    "charge": {
        "definition": "demand (an amount) as a price from someone for a service rendered or goods supplied",
        "example": "They charge a fee for their services."
    },
    "check": {
        "definition": "examine (something) in order to determine its accuracy, quality, or condition, or to detect the presence of something",
        "example": "He decided to check the details before signing the contract."
    },
    "child": {
        "definition": "a young human being below the age of puberty or below the legal age of majority",
        "example": "The child played happily in the garden."
    },
    "choice": {
        "definition": "an act of selecting or making a decision when faced with two or more possibilities",
        "example": "She made a choice to pursue her dreams."
    },
    "choose": {
        "definition": "pick out or select (someone or something) as being the best or most appropriate of two or more alternatives",
        "example": "He decided to choose the blue shirt."
    },
    "church": {
        "definition": "a building used for public Christian worship",
        "example": "They attended the church service every Sunday."
    },
    "citizen": {
        "definition": "a legally recognized subject or national of a state or commonwealth, either native or naturalized",
        "example": "She became a citizen of the country last year."
    },
    "city": {
        "definition": "a large town",
        "example": "They moved to the city for better job opportunities."
    },
    "civil": {
        "definition": "relating to ordinary citizens and their concerns, as distinct from military or ecclesiastical matters",
        "example": "The protest was a civil demonstration for rights."
    },
    "claim": {
        "definition": "state or assert that something is the case, typically without providing evidence or proof",
        "example": "He made a claim that he was the rightful heir."
    },
    "class": {
        "definition": "a set or category of things having some property or attribute in common and differentiated from others by kind, type, or quality",
        "example": "They were in the same class at school."
    },
    "clear": {
        "definition": "easy to perceive, understand, or interpret",
        "example": "The instructions were clear and easy to follow."
    },
    "clearly": {
        "definition": "in a clear manner",
        "example": "She spoke clearly so everyone could understand."
    },
    "close": {
        "definition": "move or cause to move so as to cover an opening",
        "example": "He decided to close the window because it was cold."
    },
    "coach": {
        "definition": "a person who trains and directs the members of a sports team",
        "example": "The coach prepared the team for the match."
    },
    "cold": {
        "definition": "of or at a low or relatively low temperature, especially when compared with the temperature of the human body",
        "example": "She shivered in the cold wind."
    },
    "collection": {
        "definition": "the action or process of collecting someone or something",
        "example": "He has a collection of vintage cars."
    },
    "college": {
        "definition": "an educational institution or establishment, in particular one providing higher education or specialized professional or vocational training",
        "example": "She graduated from college with honors."
    },
    "color": {
        "definition": "the property possessed by an object of producing different sensations on the eye as a result of the way it reflects or emits light",
        "example": "The painting was full of vibrant color."
    },
    "come": {
        "definition": "move or travel toward or into a place thought of as near or familiar to the speaker",
        "example": "He will come to the party later."
    },
    "commercial": {
        "definition": "concerned with or engaged in commerce",
        "example": "They launched a new commercial on television."
    },
    "common": {
        "definition": "occurring, found, or done often; prevalent",
        "example": "It is common to see snow in the winter."
    },
    "community": {
        "definition": "a group of people living in the same place or having a particular characteristic in common",
        "example": "The community came together to support the event."
    },
    "company": {
        "definition": "a commercial business",
        "example": "She works for a software company."
    },
    "compare": {
        "definition": "estimate, measure, or note the similarity or dissimilarity between",
        "example": "It\u2019s interesting to compare the two artists' styles."
    },
    "computer": {
        "definition": "an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program",
        "example": "He bought a new computer for gaming."
    },
    "concern": {
        "definition": "relate to; be about",
        "example": "The report concerns the safety of the product."
    },
    "condition": {
        "definition": "the state of something with regard to its appearance, quality, or working order",
        "example": "The car is in excellent condition."
    },
    "conference": {
        "definition": "a formal meeting for discussion",
        "example": "They attended the annual business conference."
    },
    "Congress": {
        "definition": "the national legislative body of a country",
        "example": "The new law was passed by Congress."
    },
    "consider": {
        "definition": "think carefully about (something), typically before making a decision",
        "example": "She decided to consider all her options before making a decision."
    },
    "consumer": {
        "definition": "a person who purchases goods and services for personal use",
        "example": "The company conducts regular surveys to understand consumer preferences."
    },
    "contain": {
        "definition": "have or hold (someone or something) within",
        "example": "The box contains various tools."
    },
    "continue": {
        "definition": "persist in an activity or process",
        "example": "They decided to continue their journey despite the weather."
    },
    "control": {
        "definition": "the power to influence or direct people's behavior or the course of events",
        "example": "The new manager has taken control of the project."
    },
    "cost": {
        "definition": "an amount that has to be paid or spent to buy or obtain something",
        "example": "The cost of living has increased significantly."
    },
    "could": {
        "definition": "used to indicate possibility",
        "example": "She could be the one who solves the problem."
    },
    "country": {
        "definition": "a nation with its own government, occupying a particular territory",
        "example": "They traveled to a new country every summer."
    },
    "couple": {
        "definition": "two individuals of the same sort considered together",
        "example": "The couple celebrated their anniversary."
    },
    "course": {
        "definition": "the route or direction followed by a ship, aircraft, road, or river",
        "example": "The ship changed its course due to the storm."
    },
    "court": {
        "definition": "a tribunal presided over by a judge, judges, or a magistrate in civil and criminal cases",
        "example": "She was summoned to appear in court."
    },
    "cover": {
        "definition": "put something such as a cloth or lid on top of or in front of (something) in order to protect or conceal it",
        "example": "She used a blanket to cover herself."
    },
    "create": {
        "definition": "bring (something) into existence",
        "example": "She loves to create art in her free time."
    },
    "crime": {
        "definition": "an action or omission that constitutes an offense that may be prosecuted by the state and is punishable by law",
        "example": "The crime rate in the city has decreased."
    },
    "cultural": {
        "definition": "relating to the ideas, customs, and social behavior of a society",
        "example": "They attended various cultural events during their trip."
    },
    "culture": {
        "definition": "the arts and other manifestations of human intellectual achievement regarded collectively",
        "example": "She is fascinated by Japanese culture."
    },
    "cup": {
        "definition": "a small bowl-shaped container for drinking from, typically having a handle",
        "example": "He drank a cup of coffee in the morning."
    },
    "current": {
        "definition": "belonging to the present time; happening or being used or done now",
        "example": "She is up to date with current events."
    },
    "customer": {
        "definition": "a person or organization that buys goods or services from a store or business",
        "example": "The store values its loyal customers."
    },
    "cut": {
        "definition": "make an opening, incision, or wound in (something) with a sharp-edged tool or object",
        "example": "She used scissors to cut the paper."
    },
    "dark": {
        "definition": "with little or no light",
        "example": "The room was dark and quiet."
    },
    "data": {
        "definition": "facts and statistics collected together for reference or analysis",
        "example": "The scientist analyzed the data from the experiment."
    },
    "daughter": {
        "definition": "a girl or woman in relation to either or both of her parents",
        "example": "She is proud of her daughter\u2019s achievements."
    },
    "day": {
        "definition": "a period of twenty-four hours as a unit of time, reckoned from one midnight to the next, corresponding to a rotation of the earth on its axis",
        "example": "They spent the day at the beach."
    },
    "dead": {
        "definition": "no longer alive",
        "example": "The flowers were dead after the frost."
    },
    "deal": {
        "definition": "an agreement entered into by two or more parties for their mutual benefit, especially in a business or political context",
        "example": "They struck a deal to collaborate on the project."
    },
    "death": {
        "definition": "the end of the life of a person or organism",
        "example": "They mourned the death of a loved one."
    },
    "debate": {
        "definition": "a formal discussion on a particular matter in a public meeting or legislative assembly, in which opposing arguments are put forward",
        "example": "The debate about climate change continues."
    },
    "decade": {
        "definition": "a period of ten years",
        "example": "The town has changed a lot over the past decade."
    },
    "decide": {
        "definition": "come to a resolution in the mind as a result of consideration",
        "example": "They decided to go on a trip."
    },
    "decision": {
        "definition": "a conclusion or resolution reached after consideration",
        "example": "She made a decision to switch careers."
    },
    "deep": {
        "definition": "extending far down from the top or surface",
        "example": "The lake is very deep in the middle."
    },
    "defense": {
        "definition": "the action of defending from or resisting attack",
        "example": "The city\u2019s defense was strong."
    },
    "degree": {
        "definition": "the amount, level, or extent to which something happens or is present",
        "example": "She earned a degree in engineering."
    },
    "Democrat": {
        "definition": "a member of the Democratic Party in the United States",
        "example": "He is a proud Democrat and actively participates in local politics."
    },
    "democratic": {
        "definition": "relating to or supporting democracy or its principles",
        "example": "The country held democratic elections last year."
    },
    "describe": {
        "definition": "give an account in words of (someone or something), including all the relevant characteristics, qualities, or events",
        "example": "Can you describe the scene in detail?"
    },
    "design": {
        "definition": "a plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is made",
        "example": "She sketched a design for a new dress."
    },
    "despite": {
        "definition": "without being affected by; in spite of",
        "example": "Despite the rain, they went for a walk."
    },
    "detail": {
        "definition": "an individual feature, fact, or item",
        "example": "She explained the plan in detail."
    },
    "determine": {
        "definition": "ascertain or establish exactly, typically as a result of research or calculation",
        "example": "They need to determine the cause of the problem."
    },
    "develop": {
        "definition": "grow or cause to grow and become more mature, advanced, or elaborate",
        "example": "She wants to develop her skills further."
    },
    "development": {
        "definition": "the process of developing or being developed",
        "example": "The development of new technologies is rapid."
    },
    "difference": {
        "definition": "a point or way in which people or things are dissimilar",
        "example": "There is a significant difference between the two proposals."
    },
    "different": {
        "definition": "not the same as another or each other; unlike in nature, form, or quality",
        "example": "They have different opinions on the matter."
    },
    "difficult": {
        "definition": "needing much effort or skill to accomplish, deal with, or understand",
        "example": "The test was very difficult."
    },
    "dinner": {
        "definition": "the main meal of the day, taken either around midday or in the evening",
        "example": "They had a delicious dinner together."
    },
    "direction": {
        "definition": "a course along which someone or something moves",
        "example": "They walked in the direction of the park."
    },
    "director": {
        "definition": "a person who is in charge of an activity, department, or organization",
        "example": "The director of the company made an important announcement."
    },
    "discover": {
        "definition": "find (something or someone) unexpectedly or in the course of a search",
        "example": "They hope to discover new species of plants."
    },
    "discuss": {
        "definition": "talk about (something) with another person or group of people",
        "example": "They met to discuss the upcoming project."
    },
    "discussion": {
        "definition": "the action or process of talking about something in order to reach a decision or to exchange ideas",
        "example": "The discussion was productive and insightful."
    },
    "disease": {
        "definition": "a disorder of structure or function in a human, animal, or plant, especially one that produces specific signs or symptoms or that affects a specific location and is not simply a direct result of physical injury",
        "example": "They are researching a cure for the disease."
    },
    "do": {
        "definition": "perform (an action, the precise nature of which is often unspecified)",
        "example": "She has a lot of work to do today."
    },
    "doctor": {
        "definition": "a person who is qualified to treat people who are ill",
        "example": "She visited the doctor for a check-up."
    },
    "door": {
        "definition": "a hinged, sliding, or revolving barrier at the entrance to a building, room, or vehicle, or in the framework of a cupboard",
        "example": "He opened the door and went inside."
    },
    "down": {
        "definition": "toward or in a lower place or position, especially to or on the ground or another surface",
        "example": "She walked down the stairs carefully."
    },
    "draw": {
        "definition": "produce (a picture or diagram) by making lines and marks on paper with a pencil, pen, etc.",
        "example": "She loves to draw landscapes."
    },
    "dream": {
        "definition": "a series of thoughts, images, and sensations occurring in a person's mind during sleep",
        "example": "He had a strange dream last night."
    },
    "drive": {
        "definition": "operate and control the direction and speed of a motor vehicle",
        "example": "She learned how to drive last summer."
    },
    "drop": {
        "definition": "let or make (something) fall vertically",
        "example": "He accidentally dropped his phone."
    },
    "drug": {
        "definition": "a substance that has a physiological effect when ingested or otherwise introduced into the body",
        "example": "They developed a new drug to treat the illness."
    },
    "during": {
        "definition": "throughout the course or duration of (a period of time)",
        "example": "They visited many places during their vacation."
    },
    "each": {
        "definition": "used to refer to every one of two or more people or things, regarded and identified separately",
        "example": "Each student received a certificate."
    },
    "early": {
        "definition": "happening or done before the usual or expected time",
        "example": "They decided to arrive early to avoid the crowd."
    },
    "east": {
        "definition": "the direction toward the point of the horizon where the sun rises, or the part of the horizon lying in this direction",
        "example": "The sun rises in the east."
    },
    "easy": {
        "definition": "achieved without great effort; presenting few difficulties",
        "example": "The instructions were easy to follow."
    },
    "eat": {
        "definition": "put (food) into the mouth and chew and swallow it",
        "example": "They went out to eat at a restaurant."
    },
    "economic": {
        "definition": "relating to economics or the economy",
        "example": "They discussed the country's economic policies."
    },
    "economy": {
        "definition": "the wealth and resources of a country or region, especially in terms of the production and consumption of goods and services",
        "example": "The economy has been growing steadily."
    },
    "edge": {
        "definition": "the outside limit of an object, area, or surface",
        "example": "She stood at the edge of the cliff."
    },
    "education": {
        "definition": "the process of receiving or giving systematic instruction, especially at a school or university",
        "example": "She values education and lifelong learning."
    },
    "effect": {
        "definition": "a change which is a result or consequence of an action or other cause",
        "example": "The new law had an immediate effect on the economy."
    },
    "effort": {
        "definition": "a vigorous or determined attempt",
        "example": "She put a lot of effort into her project."
    },
    "eight": {
        "definition": "equivalent to the product of two and four; one more than seven",
        "example": "There are eight apples in the basket."
    },
    "either": {
        "definition": "used before the first of two (or occasionally more) alternatives that are being specified (the other being introduced by \u2018or\u2019)",
        "example": "You can choose either tea or coffee."
    },
    "election": {
        "definition": "a formal and organized choice by vote of a person for a political office or other position",
        "example": "The presidential election is scheduled for next year."
    },
    "else": {
        "definition": "in addition; besides",
        "example": "Would you like anything else?"
    },
    "employee": {
        "definition": "a person employed for wages or salary, especially at non-executive level",
        "example": "The company hired a new employee."
    },
    "end": {
        "definition": "the final part of something, especially a period of time, an activity, or a story",
        "example": "They worked until the end of the day."
    },
    "energy": {
        "definition": "the strength and vitality required for sustained physical or mental activity",
        "example": "She has a lot of energy in the morning."
    },
    "enjoy": {
        "definition": "take delight or pleasure in (an activity or occasion)",
        "example": "They enjoy spending time together."
    },
    "enough": {
        "definition": "as much or as many as required",
        "example": "She had enough time to finish her work."
    },
    "enter": {
        "definition": "come or go into (a place)",
        "example": "They entered the building quietly."
    },
    "entire": {
        "definition": "with no part left out; whole",
        "example": "She read the entire book in one day."
    },
    "environment": {
        "definition": "the surroundings or conditions in which a person, animal, or plant lives or operates",
        "example": "They are working to protect the environment."
    },
    "environmental": {
        "definition": "relating to the natural world and the impact of human activity on its condition",
        "example": "They discussed environmental issues at the conference."
    },
    "especially": {
        "definition": "used to single out one person, thing, or situation over all others",
        "example": "She loves all animals, especially dogs."
    },
    "establish": {
        "definition": "set up (an organization, system, or set of rules) on a firm or permanent basis",
        "example": "They decided to establish a new company."
    },
    "even": {
        "definition": "used to emphasize something surprising or extreme",
        "example": "He didn\u2019t even say goodbye."
    },
    "evening": {
        "definition": "the period of time at the end of the day, usually from about 6 p.m. to bedtime",
        "example": "They went for a walk in the evening."
    },
    "event": {
        "definition": "a thing that happens, especially one of importance",
        "example": "They attended a major sporting event."
    },
    "ever": {
        "definition": "at any time",
        "example": "Have you ever been to Paris?"
    },
    "every": {
        "definition": "used before a singular noun to refer to all the individual members of a set without exception",
        "example": "Every student has a unique talent."
    },
    "everybody": {
        "definition": "every person",
        "example": "Everybody enjoyed the party."
    },
    "everyone": {
        "definition": "every person",
        "example": "Everyone is welcome to join the meeting."
    },
    "everything": {
        "definition": "all things",
        "example": "She packed everything she needed for the trip."
    },
    "evidence": {
        "definition": "the available body of facts or information indicating whether a belief or proposition is true or valid",
        "example": "They found new evidence to support their theory."
    },
    "exactly": {
        "definition": "in a precise manner; accurately",
        "example": "She knew exactly what to do."
    },
    "example": {
        "definition": "a thing characteristic of its kind or illustrating a general rule",
        "example": "She provided an example to clarify her point."
    },
    "executive": {
        "definition": "a person with senior managerial responsibility in a business organization",
        "example": "He is an executive at a major corporation."
    },
    "exist": {
        "definition": "have objective reality or being",
        "example": "Do you believe that ghosts exist?"
    },
    "expect": {
        "definition": "regard (something) as likely to happen",
        "example": "They expect the delivery to arrive tomorrow."
    },
    "experience": {
        "definition": "practical contact with and observation of facts or events",
        "example": "She gained valuable experience during her internship."
    },
    "expert": {
        "definition": "a person who is very knowledgeable about or skillful in a particular area",
        "example": "He is an expert in computer science."
    },
    "explain": {
        "definition": "make (an idea, situation, or problem) clear to someone by describing it in more detail or revealing relevant facts or ideas",
        "example": "She explained the rules of the game to the new players."
    },
    "eye": {
        "definition": "each of a pair of globular organs in the head through which people and vertebrate animals see",
        "example": "He has blue eyes."
    },
    "face": {
        "definition": "the front part of a person's head from the forehead to the chin, or the corresponding part in an animal",
        "example": "She has a friendly face."
    },
    "fact": {
        "definition": "a thing that is known or proved to be true",
        "example": "It is a fact that the Earth orbits the Sun."
    },
    "factor": {
        "definition": "a circumstance, fact, or influence that contributes to a result",
        "example": "Several factors influenced their decision."
    },
    "fail": {
        "definition": "be unsuccessful in achieving one's goal",
        "example": "He was afraid he might fail the test."
    },
    "fall": {
        "definition": "move downward, typically rapidly and freely without control, from a higher to a lower level",
        "example": "The leaves fall from the trees in autumn."
    },
    "family": {
        "definition": "a group consisting of parents and children living together in a household",
        "example": "They spent the holidays with their family."
    },
    "far": {
        "definition": "at, to, or by a great distance (used to indicate the extent to which one thing is distant from another)",
        "example": "She lives far away from the city."
    },
    "fast": {
        "definition": "moving or capable of moving at high speed",
        "example": "He ran fast to catch the bus."
    },
    "father": {
        "definition": "a man in relation to his child or children",
        "example": "Her father taught her how to ride a bike."
    },
    "fear": {
        "definition": "an unpleasant emotion caused by the threat of danger, pain, or harm",
        "example": "He had a fear of heights."
    },
    "federal": {
        "definition": "having or relating to a system of government in which several states form a unity but remain independent in internal affairs",
        "example": "The federal government passed new legislation."
    },
    "feel": {
        "definition": "experience (an emotion or sensation)",
        "example": "She feels happy today."
    },
    "feeling": {
        "definition": "an emotional state or reaction",
        "example": "He had a feeling of excitement before the concert."
    },
    "few": {
        "definition": "a small number of",
        "example": "Only a few people attended the meeting."
    },
    "field": {
        "definition": "an area of open land, especially one planted with crops or pasture, typically bounded by hedges or fences",
        "example": "They played soccer in the field."
    },
    "fight": {
        "definition": "take part in a violent struggle involving the exchange of physical blows or the use of weapons",
        "example": "They had a fight over a disagreement."
    },
    "figure": {
        "definition": "a number, especially one which forms part of official statistics or relates to the financial performance of a company",
        "example": "The sales figures were impressive."
    },
    "fill": {
        "definition": "cause (a space or container) to become full or almost full",
        "example": "She decided to fill the glass with water."
    },
    "film": {
        "definition": "a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a movie",
        "example": "They watched a film at the cinema."
    },
    "final": {
        "definition": "coming at the end of a series",
        "example": "He was preparing for his final exam."
    },
    "finally": {
        "definition": "after a long time, typically involving difficulty or delay",
        "example": "She finally finished her project."
    },
    "financial": {
        "definition": "relating to money or how money is managed",
        "example": "He received financial advice from an expert."
    },
    "find": {
        "definition": "discover or perceive by chance or unexpectedly",
        "example": "She managed to find her lost keys."
    },
    "fine": {
        "definition": "of high quality",
        "example": "She was wearing a fine dress for the event."
    },
    "finger": {
        "definition": "each of the four slender jointed parts attached to either hand (or five, if the thumb is included)",
        "example": "She cut her finger while chopping vegetables."
    },
    "finish": {
        "definition": "bring (a task or activity) to an end; complete",
        "example": "He decided to finish his homework before going out."
    },
    "fire": {
        "definition": "combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke",
        "example": "They sat by the fire to stay warm."
    },
    "firm": {
        "definition": "having a solid, almost unyielding surface or structure",
        "example": "The mattress was firm and comfortable."
    },
    "first": {
        "definition": "coming before all others in time or order; earliest; 1st",
        "example": "She was the first to arrive at the party."
    },
    "fish": {
        "definition": "a limbless cold-blooded vertebrate animal with gills and fins living wholly in water",
        "example": "They went to the lake to catch fish."
    },
    "five": {
        "definition": "equivalent to the sum of two and three; one more than four, or half of ten; 5",
        "example": "They celebrated his fifth birthday."
    },
    "floor": {
        "definition": "the lower surface of a room, on which one may walk",
        "example": "She mopped the kitchen floor."
    },
    "fly": {
        "definition": "move through the air using wings",
        "example": "The bird can fly high in the sky."
    },
    "focus": {
        "definition": "the center of interest or activity",
        "example": "He needs to focus on his studies."
    },
    "follow": {
        "definition": "go or come after (a person or thing proceeding ahead); move or travel behind",
        "example": "They decided to follow the trail through the forest."
    },
    "food": {
        "definition": "any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth",
        "example": "They bought food from the market."
    },
    "foot": {
        "definition": "the lower extremity of the leg below the ankle, on which a person stands or walks",
        "example": "He injured his foot while playing soccer."
    },
    "for": {
        "definition": "intended to be given to or used by (someone or something)",
        "example": "She bought a gift for her friend."
    },
    "force": {
        "definition": "strength or energy as an attribute of physical action or movement",
        "example": "The force of the wind was strong."
    },
    "foreign": {
        "definition": "of, from, in, or characteristic of a country or language other than one's own",
        "example": "They love learning about foreign cultures."
    },
    "forget": {
        "definition": "fail to remember",
        "example": "She tried to forget the embarrassing moment."
    },
    "form": {
        "definition": "the visible shape or configuration of something",
        "example": "They filled out a form for the application."
    },
    "former": {
        "definition": "having previously filled a particular role or been a particular thing",
        "example": "He is a former president of the company."
    },
    "forward": {
        "definition": "in the direction that one is facing or traveling; toward the front",
        "example": "She took a step forward."
    },
    "four": {
        "definition": "equivalent to the product of two and two; one more than three, or six less than ten; 4",
        "example": "They bought four tickets to the concert."
    },
    "free": {
        "definition": "not under the control or in the power of another; able to act or be done as one wishes",
        "example": "She felt free to express her opinions."
    },
    "friend": {
        "definition": "a person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations",
        "example": "She went out to lunch with her friend."
    },
    "from": {
        "definition": "indicating the point in space at which a journey, motion, or action starts",
        "example": "They traveled from New York to Paris."
    },
    "front": {
        "definition": "the side or part of an object that presents itself to view or that is normally seen or used first",
        "example": "She stood in front of the building."
    },
    "full": {
        "definition": "containing or holding as much or as many as possible; having no empty space",
        "example": "The glass was full of water."
    },
    "fund": {
        "definition": "a sum of money saved or made available for a particular purpose",
        "example": "They established a fund to support the charity."
    },
    "future": {
        "definition": "the time or a period of time following the moment of speaking or writing; time regarded as still to come",
        "example": "They are planning for the future."
    },
    "game": {
        "definition": "a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck",
        "example": "They enjoyed playing a board game together."
    },
    "garden": {
        "definition": "a piece of ground, often near a house, used for growing flowers, fruit, or vegetables",
        "example": "She planted roses in her garden."
    },
    "gas": {
        "definition": "an airlike fluid substance which expands freely to fill any space available, irrespective of its quantity",
        "example": "The car runs on gas."
    },
    "general": {
        "definition": "affecting or concerning all or most people, places, or things; widespread",
        "example": "There was a general feeling of happiness in the room."
    },
    "generation": {
        "definition": "all of the people born and living at about the same time, regarded collectively",
        "example": "The younger generation is more tech-savvy."
    },
    "get": {
        "definition": "come to have or hold (something); receive",
        "example": "She decided to get a new phone."
    },
    "girl": {
        "definition": "a female child",
        "example": "The girl played with her doll."
    },
    "give": {
        "definition": "freely transfer the possession of (something) to (someone); hand over to",
        "example": "He decided to give her a gift."
    },
    "glass": {
        "definition": "a hard, brittle substance, typically transparent or translucent, made by fusing sand with soda, lime, and sometimes other ingredients and cooling rapidly",
        "example": "She drank a glass of water."
    },
    "go": {
        "definition": "move from one place to another; travel",
        "example": "They decided to go to the beach."
    },
    "goal": {
        "definition": "the object of a person's ambition or effort; an aim or desired result",
        "example": "His goal is to become a doctor."
    },
    "good": {
        "definition": "to be desired or approved of",
        "example": "She is a good student."
    },
    "government": {
        "definition": "the governing body of a nation, state, or community",
        "example": "The government passed new laws."
    },
    "great": {
        "definition": "of an extent, amount, or intensity considerably above the normal or average",
        "example": "She had a great time at the party."
    },
    "green": {
        "definition": "of the color between blue and yellow in the spectrum; colored like grass or emeralds",
        "example": "The grass is green."
    },
    "ground": {
        "definition": "the solid surface of the earth",
        "example": "She sat on the ground."
    },
    "group": {
        "definition": "a number of people or things that are located, gathered, or classed together",
        "example": "They formed a study group."
    },
    "grow": {
        "definition": "undergo natural development by increasing in size and changing physically",
        "example": "The plant will grow taller over time."
    },
    "growth": {
        "definition": "the process of increasing in physical size",
        "example": "The company has seen significant growth."
    },
    "guess": {
        "definition": "estimate or suppose (something) without sufficient information to be sure of being correct",
        "example": "She had to guess the answer to the question."
    },
    "gun": {
        "definition": "a weapon incorporating a metal tube from which bullets, shells, or other missiles are propelled by explosive force",
        "example": "The hunter carried a gun."
    },
    "guy": {
        "definition": "a man",
        "example": "She met a nice guy at the party."
    },
    "hair": {
        "definition": "any of the fine threadlike strands growing from the skin of humans, mammals, and some other animals",
        "example": "She has long brown hair."
    },
    "half": {
        "definition": "either of two equal or corresponding parts into which something is or can be divided",
        "example": "She ate half of the pizza."
    },
    "hand": {
        "definition": "the end part of a person's arm beyond the wrist, including the palm, fingers, and thumb",
        "example": "He waved his hand in greeting."
    },
    "hang": {
        "definition": "suspend or be suspended from above with the lower part dangling free",
        "example": "They decided to hang the picture on the wall."
    },
    "happen": {
        "definition": "take place; occur",
        "example": "She didn\u2019t expect this to happen."
    },
    "happy": {
        "definition": "feeling or showing pleasure or contentment",
        "example": "She felt happy after hearing the good news."
    },
    "hard": {
        "definition": "solid, firm, and rigid; not easily broken, bent, or pierced",
        "example": "The task was very hard to complete."
    },
    "have": {
        "definition": "possess, own, or hold",
        "example": "They have a beautiful house."
    },
    "he": {
        "definition": "used to refer to a male person or animal previously mentioned or easily identified",
        "example": "He is my best friend."
    },
    "head": {
        "definition": "the upper part of the human body, or the front or upper part of the body of an animal, typically separated from the rest of the body by a neck, and containing the brain, mouth, and sense organs",
        "example": "She nodded her head in agreement."
    },
    "health": {
        "definition": "the state of being free from illness or injury",
        "example": "He is in good health."
    },
    "hear": {
        "definition": "perceive with the ear the sound made by (someone or something)",
        "example": "She could hear the music from the next room."
    },
    "heart": {
        "definition": "the organ in your chest that sends the blood around your body",
        "example": "Her heart beat faster when she saw him."
    },
    "heat": {
        "definition": "the quality of being hot; high temperature",
        "example": "The heat of the summer was unbearable."
    },
    "heavy": {
        "definition": "of great weight; difficult to lift or move",
        "example": "The box was too heavy to carry."
    },
    "help": {
        "definition": "make it easier or possible for (someone) to do something by offering one's services or resources",
        "example": "She offered to help him with his homework."
    },
    "her": {
        "definition": "used as the object of a verb or preposition to refer to a female person or animal previously mentioned or easily identified",
        "example": "He gave her a gift."
    },
    "here": {
        "definition": "in, at, or to this place or position",
        "example": "She is waiting for you here."
    },
    "herself": {
        "definition": "used as the object of a verb or preposition to refer to a female person or animal previously mentioned as the subject of the clause",
        "example": "She made the dress herself."
    },
    "high": {
        "definition": "of great vertical extent",
        "example": "The mountain is very high."
    },
    "him": {
        "definition": "used as the object of a verb or preposition to refer to a male person or animal previously mentioned or easily identified",
        "example": "She told him the news."
    },
    "himself": {
        "definition": "used as the object of a verb or preposition to refer to a male person or animal previously mentioned as the subject of the clause",
        "example": "He completed the project by himself."
    },
    "his": {
        "definition": "belonging to or associated with a male person or animal previously mentioned or easily identified",
        "example": "He lost his keys."
    },
    "history": {
        "definition": "the study of past events, particularly in human affairs",
        "example": "She is interested in the history of ancient civilizations."
    },
    "hit": {
        "definition": "bring one's hand or a tool or weapon into contact with (someone or something) quickly and forcefully",
        "example": "He accidentally hit his thumb with a hammer."
    },
    "hold": {
        "definition": "grasp, carry, or support with one's hands",
        "example": "She decided to hold the baby."
    },
    "home": {
        "definition": "the place where one lives permanently, especially as a member of a family or household",
        "example": "They invited me to their home."
    },
    "hope": {
        "definition": "a feeling of expectation and desire for a certain thing to happen",
        "example": "She has high hopes for her future."
    },
    "hospital": {
        "definition": "an institution providing medical and surgical treatment and nursing care for sick or injured people",
        "example": "He was taken to the hospital after the accident."
    },
    "hot": {
        "definition": "having a high degree of heat or a high temperature",
        "example": "The weather is very hot today."
    },
    "hotel": {
        "definition": "an establishment providing accommodations, meals, and other services for travelers and tourists",
        "example": "They stayed at a luxury hotel during their vacation."
    },
    "hour": {
        "definition": "a period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes",
        "example": "It took her an hour to complete the task."
    },
    "house": {
        "definition": "a building for human habitation, especially one that is lived in by a family or small group of people",
        "example": "They bought a new house in the suburbs."
    },
    "how": {
        "definition": "in what way or manner; by what means",
        "example": "How does this machine work?"
    },
    "however": {
        "definition": "used to introduce a statement that contrasts with or seems to contradict something that has been said previously",
        "example": "She didn't like the movie; however, she liked the soundtrack."
    },
    "huge": {
        "definition": "extremely large; enormous",
        "example": "The elephant is a huge animal."
    },
    "human": {
        "definition": "relating to or characteristic of people or human beings",
        "example": "She is studying human anatomy."
    },
    "hundred": {
        "definition": "the number equivalent to the product of ten and ten; 100",
        "example": "There were a hundred people at the event."
    },
    "husband": {
        "definition": "a married man considered in relation to his spouse",
        "example": "Her husband is a great cook."
    },
    "idea": {
        "definition": "a thought or suggestion as to a possible course of action",
        "example": "She had a brilliant idea for the project."
    },
    "identify": {
        "definition": "establish or indicate who or what (someone or something) is",
        "example": "The witness was able to identify the suspect."
    },
    "if": {
        "definition": "introducing a conditional clause",
        "example": "If it rains, we will stay indoors."
    },
    "image": {
        "definition": "a representation of the external form of a person or thing in art",
        "example": "She saw her image in the mirror."
    },
    "imagine": {
        "definition": "form a mental image or concept of",
        "example": "He could imagine a world without war."
    },
    "impact": {
        "definition": "the action of one object coming forcibly into contact with another",
        "example": "The impact of the crash was severe."
    },
    "important": {
        "definition": "of great significance or value; likely to have a profound effect on success, survival, or well-being",
        "example": "It is important to stay hydrated."
    },
    "improve": {
        "definition": "make or become better",
        "example": "She is trying to improve her skills."
    },
    "include": {
        "definition": "comprise or contain as part of a whole",
        "example": "The package includes all necessary accessories."
    },
    "including": {
        "definition": "containing as part of the whole being considered",
        "example": "Several topics were discussed, including climate change."
    },
    "increase": {
        "definition": "become or make greater in size, amount, or degree",
        "example": "They hope to increase sales by 20%."
    },
    "indeed": {
        "definition": "used to emphasize a statement or response confirming something already suggested",
        "example": "Indeed, it was a beautiful day."
    },
    "indicate": {
        "definition": "point out; show",
        "example": "The sign indicates the right direction."
    },
    "individual": {
        "definition": "a single human being as distinct from a group, class, or family",
        "example": "Each individual has their own unique talents."
    },
    "industry": {
        "definition": "economic activity concerned with the processing of raw materials and manufacture of goods in factories",
        "example": "The automotive industry is a major part of the economy."
    },
    "information": {
        "definition": "facts provided or learned about something or someone",
        "example": "She gathered information for her research paper."
    },
    "inside": {
        "definition": "situated within the confines of (something)",
        "example": "He found the book inside the drawer."
    },
    "instead": {
        "definition": "as an alternative or substitute",
        "example": "She chose to walk instead of taking the bus."
    },
    "institution": {
        "definition": "an organization founded and united for a specific purpose",
        "example": "The institution provides support to those in need."
    },
    "interest": {
        "definition": "the state of wanting to know or learn about something or someone",
        "example": "She has a keen interest in astronomy."
    },
    "interesting": {
        "definition": "arousing curiosity or interest; holding or catching the attention",
        "example": "The lecture was very interesting."
    },
    "international": {
        "definition": "existing, occurring, or carried on between nations",
        "example": "They attended an international conference."
    },
    "interview": {
        "definition": "a meeting of people face to face, especially for consultation",
        "example": "She had an interview for the new job."
    },
    "investment": {
        "definition": "the action or process of investing money for profit or material result",
        "example": "He made a wise investment in the stock market."
    },
    "involve": {
        "definition": "include (something) as a necessary part or result",
        "example": "The project will involve several teams."
    },
    "issue": {
        "definition": "an important topic or problem for debate or discussion",
        "example": "They discussed the issue at the meeting."
    },
    "it": {
        "definition": "used to refer to a thing previously mentioned or easily identified",
        "example": "The cat is sleeping. It looks very comfortable."
    },
    "item": {
        "definition": "an individual article or unit, especially one that is part of a list, collection, or set",
        "example": "She checked off each item on the list."
    },
    "its": {
        "definition": "belonging to or associated with a thing previously mentioned or easily identified",
        "example": "The dog wagged its tail."
    },
    "itself": {
        "definition": "used as the object of a verb or preposition to refer to a thing or animal previously mentioned as the subject of the clause",
        "example": "The cat cleaned itself."
    },
    "job": {
        "definition": "a paid position of regular employment",
        "example": "She applied for a job at the company."
    },
    "join": {
        "definition": "link; connect",
        "example": "He decided to join the club."
    },
    "just": {
        "definition": "exactly",
        "example": "He arrived just in time."
    },
    "keep": {
        "definition": "have or retain possession of",
        "example": "She decided to keep the old photographs."
    },
    "key": {
        "definition": "a small piece of shaped metal with incisions cut to fit the wards of a particular lock, and which is inserted into a lock and turned to open or close it",
        "example": "He couldn't find the key to the door."
    },
    "kid": {
        "definition": "a child or young person",
        "example": "The kid played with his toys."
    },
    "kill": {
        "definition": "cause the death of (a person, animal, or other living thing)",
        "example": "The hunter aimed to kill the deer."
    },
    "kind": {
        "definition": "a group of people or things having similar characteristics",
        "example": "She likes every kind of music."
    },
    "kitchen": {
        "definition": "a room or area where food is prepared and cooked",
        "example": "She spent the morning cleaning the kitchen."
    },
    "know": {
        "definition": "be aware of through observation, inquiry, or information",
        "example": "He didn't know the answer to the question."
    },
    "knowledge": {
        "definition": "facts, information, and skills acquired by a person through experience or education",
        "example": "She has a vast knowledge of history."
    },
    "land": {
        "definition": "the part of the earth's surface that is not covered by water",
        "example": "They bought a piece of land to build their house on."
    },
    "language": {
        "definition": "the method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way",
        "example": "She is fluent in several languages."
    },
    "large": {
        "definition": "of considerable or relatively great size, extent, or capacity",
        "example": "They live in a large house."
    },
    "last": {
        "definition": "coming after all others in time or order; final",
        "example": "He was the last person to leave the party."
    },
    "late": {
        "definition": "doing something or taking place after the expected, proper, or usual time",
        "example": "She was late to the meeting."
    },
    "later": {
        "definition": "at a time in the future or after the time you have mentioned",
        "example": "He will finish the project later."
    },
    "laugh": {
        "definition": "make the spontaneous sounds and movements of the face and body that are the instinctive expressions of lively amusement",
        "example": "They couldn't stop laughing at the joke."
    },
    "law": {
        "definition": "the system of rules which a particular country or community recognizes as regulating the actions of its members and which it may enforce by the imposition of penalties",
        "example": "The new law was passed by the government."
    },
    "lawyer": {
        "definition": "a person who practices or studies law; an attorney or a counselor",
        "example": "She consulted a lawyer for legal advice."
    },
    "lay": {
        "definition": "put down, especially gently or carefully",
        "example": "She decided to lay the book on the table."
    },
    "lead": {
        "definition": "cause (a person or animal) to go with one by holding them by the hand, a halter, a rope, etc., while moving forward",
        "example": "He decided to lead the team to victory."
    },
    "leader": {
        "definition": "the person who leads or commands a group, organization, or country",
        "example": "She is a natural leader and inspires her team."
    },
    "learn": {
        "definition": "gain or acquire knowledge of or skill in (something) by study, experience, or being taught",
        "example": "She wants to learn how to play the piano."
    },
    "least": {
        "definition": "smallest in amount, extent, or significance",
        "example": "She had the least amount of homework in the class."
    },
    "leave": {
        "definition": "go away from",
        "example": "They decided to leave the party early."
    },
    "left": {
        "definition": "on, towards, or relating to the side of a human body or of a thing which is to the west when the person or thing is facing north",
        "example": "She turned left at the intersection."
    },
    "leg": {
        "definition": "each of the limbs on which a person or animal walks and stands",
        "example": "He injured his leg while playing soccer."
    },
    "legal": {
        "definition": "relating to the law",
        "example": "She sought legal advice from her lawyer."
    },
    "less": {
        "definition": "a smaller amount of; not as much",
        "example": "She spent less money than she expected."
    },
    "let": {
        "definition": "allow or permit (someone) to do something",
        "example": "He decided to let her borrow his book."
    },
    "letter": {
        "definition": "a written, typed, or printed communication, especially one sent in an envelope by mail or messenger",
        "example": "She received a letter from her friend."
    },
    "level": {
        "definition": "a position on a real or imaginary scale of amount, quantity, extent, or quality",
        "example": "The water level in the lake has risen."
    },
    "lie": {
        "definition": "be in or assume a horizontal or resting position on a supporting surface",
        "example": "She decided to lie down on the couch."
    },
    "life": {
        "definition": "the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death",
        "example": "She is enjoying her life to the fullest."
    },
    "light": {
        "definition": "the natural agent that stimulates sight and makes things visible",
        "example": "The room was filled with bright light."
    },
    "like": {
        "definition": "having the same characteristics or qualities as; similar to",
        "example": "She has a dress like mine."
    },
    "likely": {
        "definition": "such as well might happen or be true; probable",
        "example": "It is likely to rain tomorrow."
    },
    "line": {
        "definition": "a long, narrow mark or band",
        "example": "She drew a straight line on the paper."
    },
    "list": {
        "definition": "a number of connected items or names written or printed consecutively, typically one below the other",
        "example": "She made a list of things to do."
    },
    "listen": {
        "definition": "give one's attention to a sound",
        "example": "He likes to listen to music while studying."
    },
    "little": {
        "definition": "small in size, amount, or degree (often used to convey an appealing diminutiveness or express an affectionate or condescending attitude)",
        "example": "She has a little dog that is very playful."
    },
    "live": {
        "definition": "remain alive",
        "example": "They decided to live in the countryside."
    },
    "local": {
        "definition": "relating or restricted to a particular area or one's neighborhood",
        "example": "They visited the local market."
    },
    "long": {
        "definition": "measuring a great distance from end to end",
        "example": "She wore a long dress to the event."
    },
    "look": {
        "definition": "direct one's gaze toward someone or something or in a specified direction",
        "example": "She decided to look out the window."
    },
    "lose": {
        "definition": "be deprived of or cease to have or retain (something)",
        "example": "He was upset because he managed to lose his wallet."
    },
    "loss": {
        "definition": "the fact or process of losing something or someone",
        "example": "The company reported a significant loss last quarter."
    },
    "lot": {
        "definition": "a large number or amount; a great deal",
        "example": "She has a lot of friends."
    },
    "love": {
        "definition": "an intense feeling of deep affection",
        "example": "They are in love with each other."
    },
    "low": {
        "definition": "of less than average height from top to bottom or to the top from the ground",
        "example": "The shelf is too low for me to stand up."
    },
    "machine": {
        "definition": "an apparatus using mechanical power and having several parts, each with a definite function and together performing a particular task",
        "example": "He bought a new washing machine."
    },
    "magazine": {
        "definition": "a periodical publication containing articles and illustrations, typically covering a particular subject or area of interest",
        "example": "She enjoys reading fashion magazines."
    },
    "main": {
        "definition": "chief in size or importance",
        "example": "The main reason for their visit was to see the museum."
    },
    "maintain": {
        "definition": "cause or enable (a condition or state of affairs) to continue",
        "example": "She tries to maintain a healthy lifestyle."
    },
    "major": {
        "definition": "important, serious, or significant",
        "example": "He is a major influence in the field of science."
    },
    "majority": {
        "definition": "the greater number",
        "example": "The majority of the students passed the exam."
    },
    "make": {
        "definition": "form (something) by putting parts together or combining substances; create",
        "example": "She decided to make a cake for the party."
    },
    "man": {
        "definition": "an adult human male",
        "example": "The man was very kind and helpful."
    },
    "manage": {
        "definition": "be in charge of (a company, establishment, or undertaking); administer; run",
        "example": "She manages a team of five people."
    },
    "management": {
        "definition": "the process of dealing with or controlling things or people",
        "example": "He is studying business management."
    },
    "manager": {
        "definition": "a person responsible for controlling or administering an organization or group of staff",
        "example": "She was promoted to the position of manager."
    },
    "many": {
        "definition": "a large number of",
        "example": "There are many books in the library."
    },
    "market": {
        "definition": "a regular gathering of people for the purchase and sale of provisions, livestock, and other commodities",
        "example": "They bought fresh produce from the local market."
    },
    "marriage": {
        "definition": "the legally or formally recognized union of two people as partners in a personal relationship",
        "example": "They celebrated their 25th wedding anniversary with a grand party."
    },
    "material": {
        "definition": "the matter from which a thing is or can be made",
        "example": "The dress was made from high-quality material."
    },
    "matter": {
        "definition": "a subject or situation under consideration",
        "example": "The matter is still under investigation."
    },
    "may": {
        "definition": "expressing possibility",
        "example": "She may join us for dinner."
    },
    "maybe": {
        "definition": "perhaps; possibly",
        "example": "Maybe we'll go to the beach this weekend."
    },
    "me": {
        "definition": "used by a speaker to refer to himself or herself as the object of a verb or preposition",
        "example": "He gave the book to me."
    },
    "mean": {
        "definition": "intend to convey, indicate, or refer to (a particular thing or notion); signify",
        "example": "What do you mean by that statement?"
    },
    "measure": {
        "definition": "ascertain the size, amount, or degree of (something) by using an instrument or device marked in standard units",
        "example": "She used a ruler to measure the length of the table."
    },
    "media": {
        "definition": "the main means of mass communication (broadcasting, publishing, and the internet), regarded collectively",
        "example": "The news spread quickly through social media."
    },
    "medical": {
        "definition": "relating to the science or practice of medicine",
        "example": "She received medical treatment for her injury."
    },
    "meet": {
        "definition": "come into the presence or company of (someone) by chance or arrangement",
        "example": "They decided to meet at the caf\u00e9."
    },
    "meeting": {
        "definition": "an assembly of people, especially the members of a society or committee, for discussion or entertainment",
        "example": "The team held a meeting to discuss the project."
    },
    "member": {
        "definition": "an individual belonging to a group such as a society or team",
        "example": "She is a member of the book club."
    },
    "memory": {
        "definition": "the faculty by which the mind stores and remembers information",
        "example": "She has a good memory for names."
    },
    "mention": {
        "definition": "refer to something briefly and without going into detail",
        "example": "He mentioned the upcoming event during the meeting."
    },
    "message": {
        "definition": "a verbal, written, or recorded communication sent to or left for a recipient who cannot be contacted directly",
        "example": "She left a message on his voicemail."
    },
    "method": {
        "definition": "a particular form of procedure for accomplishing or approaching something, especially a systematic or established one",
        "example": "They developed a new method for testing the product."
    },
    "middle": {
        "definition": "the point or position at an equal distance from the sides, edges, or ends of something",
        "example": "He stood in the middle of the room."
    },
    "might": {
        "definition": "used to express possibility or make a suggestion",
        "example": "She might come to the party later."
    },
    "military": {
        "definition": "relating to or characteristic of soldiers or armed forces",
        "example": "He served in the military for ten years."
    },
    "million": {
        "definition": "the number equivalent to the product of a thousand and a thousand; 1,000,000",
        "example": "The population of the city is over a million."
    },
    "mind": {
        "definition": "the element of a person that enables them to be aware of the world and their experiences, to think, and to feel; the faculty of consciousness and thought",
        "example": "She has a sharp mind and quick wit."
    },
    "minute": {
        "definition": "a period of time equal to sixty seconds or a sixtieth of an hour",
        "example": "The meeting will start in five minutes."
    },
    "miss": {
        "definition": "fail to hit, reach, or come into contact with (something aimed at)",
        "example": "She managed to miss the bus by just a few seconds."
    },
    "mission": {
        "definition": "an important assignment carried out for political, religious, or commercial purposes, typically involving travel",
        "example": "Their mission was to deliver humanitarian aid."
    },
    "model": {
        "definition": "a three-dimensional representation of a person or thing or of a proposed structure, typically on a smaller scale than the original",
        "example": "They built a scale model of the building."
    },
    "modern": {
        "definition": "relating to the present or recent times as opposed to the remote past",
        "example": "The apartment has a modern design."
    },
    "moment": {
        "definition": "a very brief period of time",
        "example": "She paused for a moment to gather her thoughts."
    },
    "money": {
        "definition": "a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively",
        "example": "She saved her money for a rainy day."
    },
    "month": {
        "definition": "each of the twelve named periods into which a year is divided",
        "example": "They plan to take a vacation next month."
    },
    "more": {
        "definition": "a greater or additional amount or degree",
        "example": "She wanted more time to finish the assignment."
    },
    "morning": {
        "definition": "the period of time between midnight and noon, especially from sunrise to noon",
        "example": "She enjoys going for a jog in the morning."
    },
    "most": {
        "definition": "greatest in amount or degree",
        "example": "She is the most talented artist in the class."
    },
    "mother": {
        "definition": "a woman in relation to her child or children",
        "example": "She is a loving and caring mother."
    },
    "mouth": {
        "definition": "the opening in the lower part of the human face, surrounded by the lips, through which food is taken in and vocal sounds are emitted",
        "example": "She opened her mouth to speak."
    },
    "move": {
        "definition": "go in a specified direction or manner; change position",
        "example": "They decided to move to a new city."
    },
    "movement": {
        "definition": "an act of changing physical location or position or of having this changed",
        "example": "The movement of the dancers was graceful."
    },
    "movie": {
        "definition": "a story or event recorded by a camera as a set of moving images and shown in a theater or on television",
        "example": "They went to see a movie at the cinema."
    },
    "Mr": {
        "definition": "a title used before a surname or full name to address or refer to a man without a higher or honorific or professional title",
        "example": "Mr. Smith will be our guest speaker today."
    },
    "Mrs": {
        "definition": "a title used before a surname or full name to address or refer to a married woman without a higher or honorific or professional title",
        "example": "Mrs. Johnson will be joining us for dinner."
    },
    "much": {
        "definition": "a great amount or quantity of",
        "example": "She doesn't have much free time."
    },
    "music": {
        "definition": "vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion",
        "example": "She enjoys listening to classical music."
    },
    "must": {
        "definition": "be obliged to; should (used to express necessity or inevitability)",
        "example": "You must complete your homework before playing outside."
    },
    "my": {
        "definition": "belonging to or associated with the speaker",
        "example": "She is my best friend."
    },
    "myself": {
        "definition": "used by a speaker to refer to himself or herself as the object of a verb or preposition when he or she is the subject of the clause",
        "example": "I made the cake myself."
    },
    "name": {
        "definition": "a word or set of words by which a person or thing is known, addressed, or referred to",
        "example": "Her name is Sarah."
    },
    "nation": {
        "definition": "a large aggregate of people united by common descent, history, culture, or language, inhabiting a particular country or territory",
        "example": "The nation celebrated its independence day."
    },
    "national": {
        "definition": "relating to a nation; common to or characteristic of a whole nation",
        "example": "The national flag was raised at the ceremony."
    },
    "natural": {
        "definition": "existing in or derived from nature; not made or caused by humankind",
        "example": "The park is known for its natural beauty."
    },
    "nature": {
        "definition": "the phenomena of the physical world collectively, including plants, animals, the landscape, and other features and products of the earth, as opposed to humans or human creations",
        "example": "She loves spending time in nature."
    },
    "near": {
        "definition": "at or to a short distance away; close",
        "example": "The school is near her house."
    },
    "nearly": {
        "definition": "very close to; almost",
        "example": "She nearly missed her flight."
    },
    "necessary": {
        "definition": "required to be done, achieved, or present; needed; essential",
        "example": "It is necessary to wear a helmet while riding a bike."
    },
    "need": {
        "definition": "require (something) because it is essential or very important rather than just desirable",
        "example": "You need to drink water to stay hydrated."
    },
    "network": {
        "definition": "a group or system of interconnected people or things",
        "example": "The company has a vast network of suppliers."
    },
    "never": {
        "definition": "at no time in the past or future; on no occasion; not ever",
        "example": "She has never been to Paris."
    },
    "new": {
        "definition": "not existing before; made, introduced, or discovered recently or now for the first time",
        "example": "He bought a new car."
    },
    "news": {
        "definition": "newly received or noteworthy information, especially about recent or important events",
        "example": "She watches the news every evening."
    },
    "newspaper": {
        "definition": "a printed publication (usually issued daily or weekly) consisting of folded unstapled sheets and containing news, articles, advertisements, and correspondence",
        "example": "He reads the newspaper every morning."
    },
    "next": {
        "definition": "coming immediately after the present one in order, rank, or space",
        "example": "She will be the next to speak."
    },
    "nice": {
        "definition": "pleasant; agreeable; satisfactory",
        "example": "They had a nice time at the beach."
    },
    "night": {
        "definition": "the period of darkness in each twenty-four hours; the time from sunset to sunrise",
        "example": "She prefers to study at night."
    },
    "no": {
        "definition": "not any",
        "example": "There is no milk left in the fridge."
    },
    "none": {
        "definition": "not any",
        "example": "None of the students knew the answer."
    },
    "nor": {
        "definition": "used to introduce a further negative statement",
        "example": "She did not speak, nor did she move."
    },
    "north": {
        "definition": "the direction in which a compass needle normally points, toward the horizon on the left-hand side of a person facing east, or the part of the horizon lying in this direction",
        "example": "They traveled north to reach the mountains."
    },
    "not": {
        "definition": "used with an auxiliary verb or 'be' to form the negative",
        "example": "She is not coming to the party."
    },
    "note": {
        "definition": "a brief record of facts, topics, or thoughts, written down as an aid to memory",
        "example": "She made a note of the meeting date."
    },
    "nothing": {
        "definition": "not anything; no single thing",
        "example": "There is nothing to worry about."
    },
    "notice": {
        "definition": "become aware of",
        "example": "He didn't notice the change in her appearance."
    },
    "now": {
        "definition": "at the present moment",
        "example": "She is studying right now."
    },
    "n't": {
        "definition": "used with auxiliary verbs to form negatives",
        "example": "She isn't happy with the results."
    },
    "number": {
        "definition": "an arithmetical value, expressed by a word, symbol, or figure, representing a particular quantity and used in counting and making calculations",
        "example": "She wrote down the phone number."
    },
    "occur": {
        "definition": "happen; take place",
        "example": "The event is set to occur next week."
    },
    "off": {
        "definition": "away from the place in question; to or at a distance",
        "example": "He walked off without saying goodbye."
    },
    "offer": {
        "definition": "present or proffer (something) for (someone) to accept or reject as so desired",
        "example": "She decided to offer him some help."
    },
    "office": {
        "definition": "a room, set of rooms, or building used as a place for commercial, professional, or bureaucratic work",
        "example": "She works in a spacious office."
    },
    "officer": {
        "definition": "a person holding a position of authority in the armed services, in the police force, or in a similar organization",
        "example": "The officer directed traffic at the busy intersection."
    },
    "official": {
        "definition": "relating to an authority or public body and its activities and responsibilities",
        "example": "The official report was released yesterday."
    },
    "often": {
        "definition": "frequently; many times",
        "example": "She often visits her grandparents on weekends."
    },
    "oh": {
        "definition": "used to express a range of emotions including surprise, anger, disappointment, or joy, or when reacting to a remark or an event",
        "example": "Oh, I didn't know you were coming!"
    },
    "oil": {
        "definition": "a viscous liquid derived from petroleum, especially for use as a fuel or lubricant",
        "example": "He checked the oil level in his car."
    },
    "ok": {
        "definition": "used to express agreement or acceptance",
        "example": "She said it was ok to come over."
    },
    "old": {
        "definition": "having lived for a long time; no longer young",
        "example": "The old man told stories of his youth."
    },
    "on": {
        "definition": "physically in contact with and supported by (a surface)",
        "example": "She placed the book on the table."
    },
    "once": {
        "definition": "on one occasion or for one time only",
        "example": "She has only been there once."
    },
    "one": {
        "definition": "the lowest cardinal number; half of two; 1",
        "example": "There is only one cookie left."
    },
    "only": {
        "definition": "and no one or nothing more besides; solely or exclusively",
        "example": "She was the only person in the room."
    },
    "onto": {
        "definition": "moving to a location on (the surface of something)",
        "example": "She climbed onto the roof to get a better view."
    },
    "open": {
        "definition": "allowing access, passage, or a view through an empty space; not closed or blocked",
        "example": "She left the door open."
    },
    "operation": {
        "definition": "an act of surgery performed on a patient",
        "example": "The patient underwent a successful operation."
    },
    "opportunity": {
        "definition": "a set of circumstances that makes it possible to do something",
        "example": "She seized the opportunity to travel abroad."
    },
    "option": {
        "definition": "a thing that is or may be chosen",
        "example": "They had the option to either take the bus or walk."
    },
    "or": {
        "definition": "used to link alternatives",
        "example": "Would you like tea or coffee?"
    },
    "order": {
        "definition": "the arrangement or disposition of people or things in relation to each other according to a particular sequence, pattern, or method",
        "example": "The books are arranged in alphabetical order."
    },
    "organization": {
        "definition": "an organized body of people with a particular purpose, especially a business, society, association, etc.",
        "example": "She works for a non-profit organization."
    },
    "other": {
        "definition": "used to refer to a person or thing that is different or distinct from one already mentioned or known",
        "example": "The other students were already seated."
    },
    "others": {
        "definition": "plural form of other",
        "example": "Some students prefer to study alone, while others prefer group study."
    },
    "our": {
        "definition": "belonging to or associated with the speaker and one or more other people previously mentioned or easily identified",
        "example": "This is our house."
    },
    "out": {
        "definition": "moving or appearing to move away from a particular place, especially one that is enclosed or hidden",
        "example": "She went out to the garden."
    },
    "outside": {
        "definition": "situated or moving beyond the boundaries or confines of",
        "example": "They played outside in the yard."
    },
    "over": {
        "definition": "extending directly upward from",
        "example": "The cat jumped over the fence."
    },
    "own": {
        "definition": "possess (something) as one's own; have",
        "example": "They own a beautiful house."
    },
    "owner": {
        "definition": "a person who owns something",
        "example": "She is the owner of the bookstore."
    },
    "page": {
        "definition": "one or both sides of a sheet of paper in a book, magazine, newspaper, or other collection of bound sheets",
        "example": "She read the first page of the book."
    },
    "pain": {
        "definition": "physical suffering or discomfort caused by illness or injury",
        "example": "He felt a sharp pain in his leg."
    },
    "painting": {
        "definition": "the process or art of using paint, in a picture, as a protective coating, or as decoration",
        "example": "The gallery exhibited a beautiful painting."
    },
    "paper": {
        "definition": "material manufactured in thin sheets from the pulp of wood or other fibrous substances, used for writing, drawing, or printing on, or as wrapping material",
        "example": "She wrote a letter on a piece of paper."
    },
    "parent": {
        "definition": "a father or mother",
        "example": "Her parents are very supportive."
    },
    "part": {
        "definition": "an amount or section which, when combined with others, makes up the whole of something",
        "example": "She read the first part of the story."
    },
    "participant": {
        "definition": "a person who takes part in something",
        "example": "Every participant in the race received a medal."
    },
    "particular": {
        "definition": "used to single out an individual member of a specified group or class",
        "example": "She paid attention to one particular detail."
    },
    "particularly": {
        "definition": "to a higher degree than is usual or average",
        "example": "She was particularly interested in the history of the region."
    },
    "partner": {
        "definition": "either of a pair of people engaged together in the same activity",
        "example": "He is my business partner."
    },
    "party": {
        "definition": "a social gathering of invited guests, typically involving eating, drinking, and entertainment",
        "example": "They had a birthday party for their friend."
    },
    "pass": {
        "definition": "move or cause to move in a specified direction",
        "example": "She decided to pass the ball to her teammate."
    },
    "past": {
        "definition": "gone by in time and no longer existing",
        "example": "She spoke about events in her past."
    },
    "patient": {
        "definition": "able to accept or tolerate delays, problems, or suffering without becoming annoyed or anxious",
        "example": "She remained patient while waiting for her turn."
    },
    "pattern": {
        "definition": "a repeated decorative design",
        "example": "The fabric had a beautiful floral pattern."
    },
    "pay": {
        "definition": "give (someone) money that is due for work done, goods received, or a debt incurred",
        "example": "He needs to pay the bills."
    },
    "peace": {
        "definition": "freedom from disturbance; tranquility",
        "example": "She enjoys the peace and quiet of the countryside."
    },
    "people": {
        "definition": "human beings in general or considered collectively",
        "example": "Many people attended the concert."
    },
    "per": {
        "definition": "for each (used with units to express a rate)",
        "example": "The car can travel 30 miles per gallon."
    },
    "perform": {
        "definition": "carry out, accomplish, or fulfill (an action, task, or function)",
        "example": "She will perform a song at the talent show."
    },
    "performance": {
        "definition": "an act of staging or presenting a play, concert, or other form of entertainment",
        "example": "The play had an outstanding performance."
    },
    "perhaps": {
        "definition": "used to express uncertainty or possibility",
        "example": "Perhaps it will rain tomorrow."
    },
    "period": {
        "definition": "a length or portion of time",
        "example": "She studied for a long period."
    },
    "person": {
        "definition": "a human being regarded as an individual",
        "example": "He is a very kind person."
    },
    "personal": {
        "definition": "belonging to or affecting a particular person rather than anyone else",
        "example": "She shared her personal story."
    },
    "phone": {
        "definition": "a telephone",
        "example": "She called her friend on the phone."
    },
    "physical": {
        "definition": "relating to the body as opposed to the mind",
        "example": "Regular exercise is good for physical health."
    },
    "pick": {
        "definition": "take hold of and remove (a flower, fruit, or vegetable) from where it is growing",
        "example": "She likes to pick fresh berries."
    },
    "picture": {
        "definition": "a painting or drawing",
        "example": "She took a picture of the sunset."
    },
    "piece": {
        "definition": "a portion of an object or of material, produced by cutting, tearing, or breaking the whole",
        "example": "He gave her a piece of cake."
    },
    "place": {
        "definition": "a particular position or point in space",
        "example": "They found a place to sit in the park."
    },
    "plan": {
        "definition": "a detailed proposal for doing or achieving something",
        "example": "She made a plan for the weekend."
    },
    "plant": {
        "definition": "a living organism of the kind exemplified by trees, shrubs, herbs, grasses, ferns, and mosses, typically growing in a permanent site, absorbing water and inorganic substances through its roots, and synthesizing nutrients in its leaves by photosynthesis using the green pigment chlorophyll",
        "example": "She decided to plant flowers in the garden."
    },
    "play": {
        "definition": "engage in activity for enjoyment and recreation rather than a serious or practical purpose",
        "example": "The children like to play outside."
    },
    "player": {
        "definition": "a person taking part in a sport or game",
        "example": "He is a skilled basketball player."
    },
    "PM": {
        "definition": "afternoon and evening",
        "example": "The meeting is scheduled for 3 PM."
    },
    "point": {
        "definition": "a particular spot, place, or position in an area or on a map, object, or surface",
        "example": "She made a valid point during the discussion."
    },
    "police": {
        "definition": "the civil force of a national or local government, responsible for the prevention and detection of crime and the maintenance of public order",
        "example": "The police responded quickly to the emergency."
    },
    "policy": {
        "definition": "a course or principle of action adopted or proposed by an organization or individual",
        "example": "The company has a strict no-smoking policy."
    },
    "political": {
        "definition": "relating to the government or the public affairs of a country",
        "example": "She is interested in political science."
    },
    "politics": {
        "definition": "the activities associated with the governance of a country or area, especially the debate between parties having power",
        "example": "They discussed politics over dinner."
    },
    "poor": {
        "definition": "lacking sufficient money to live at a standard considered comfortable or normal in a society",
        "example": "The charity helps poor families."
    },
    "popular": {
        "definition": "liked or admired by many people or by a particular person or group",
        "example": "She is a popular student in her school."
    },
    "population": {
        "definition": "all the inhabitants of a particular town, area, or country",
        "example": "The population of the city is growing rapidly."
    },
    "position": {
        "definition": "a place where someone or something is located or has been put",
        "example": "She found a comfortable position to read her book."
    },
    "positive": {
        "definition": "consisting in or characterized by the presence or possession of features or qualities rather than their absence",
        "example": "She has a positive attitude towards life."
    },
    "possible": {
        "definition": "able to be done or achieved",
        "example": "It is possible to finish the project on time."
    },
    "power": {
        "definition": "the ability or capacity to do something or act in a particular way",
        "example": "The wind turbine generates power for the town."
    },
    "practice": {
        "definition": "the actual application or use of an idea, belief, or method, as opposed to theories about such application or use",
        "example": "She needs more practice to improve her skills."
    },
    "prepare": {
        "definition": "make (something) ready for use or consideration",
        "example": "She took time to prepare for her presentation."
    },
    "present": {
        "definition": "existing or occurring now",
        "example": "She is happy with her present situation."
    },
    "president": {
        "definition": "the elected head of a republican state",
        "example": "The president gave a speech to the nation."
    },
    "pressure": {
        "definition": "the continuous physical force exerted on or against an object by something in contact with it",
        "example": "She felt a lot of pressure to perform well."
    },
    "pretty": {
        "definition": "attractive in a delicate way without being truly beautiful or handsome",
        "example": "She wore a pretty dress to the party."
    },
    "prevent": {
        "definition": "keep (something) from happening or arising",
        "example": "Proper hygiene can prevent the spread of illness."
    },
    "price": {
        "definition": "the amount of money expected, required, or given in payment for something",
        "example": "The price of the book was quite reasonable."
    },
    "private": {
        "definition": "belonging to or for the use of one particular person or group of people only",
        "example": "She has a private office."
    },
    "probably": {
        "definition": "almost certainly; as far as one knows or can tell",
        "example": "She will probably attend the meeting."
    },
    "problem": {
        "definition": "a matter or situation regarded as unwelcome or harmful and needing to be dealt with and overcome",
        "example": "She solved the problem quickly."
    },
    "process": {
        "definition": "a series of actions or steps taken in order to achieve a particular end",
        "example": "The process of applying for a visa can be complicated."
    },
    "produce": {
        "definition": "make or manufacture from components or raw materials",
        "example": "The factory produces high-quality goods."
    },
    "product": {
        "definition": "an article or substance that is manufactured or refined for sale",
        "example": "The company launched a new product."
    },
    "production": {
        "definition": "the action of making or manufacturing from components or raw materials, or the process of being so manufactured",
        "example": "The production of the movie took two years."
    },
    "professional": {
        "definition": "relating to or connected with a profession",
        "example": "She received professional training for the job."
    },
    "professor": {
        "definition": "a teacher of the highest rank in a college or university",
        "example": "The professor gave an interesting lecture."
    },
    "program": {
        "definition": "a planned series of future events or performances",
        "example": "The conference includes a program of keynote speeches."
    },
    "project": {
        "definition": "an individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim",
        "example": "She is working on a new project at work."
    },
    "property": {
        "definition": "a thing or things belonging to someone; possessions collectively",
        "example": "They own a lot of property in the city."
    },
    "protect": {
        "definition": "keep safe from harm or injury",
        "example": "She wore a helmet to protect her head."
    },
    "prove": {
        "definition": "demonstrate the truth or existence of (something) by evidence or argument",
        "example": "He had to prove his point with facts."
    },
    "provide": {
        "definition": "make available for use; supply",
        "example": "The company provides health insurance to its employees."
    },
    "public": {
        "definition": "of or concerning the people as a whole",
        "example": "The park is open to the public."
    },
    "pull": {
        "definition": "exert force on (someone or something) so as to cause movement toward oneself",
        "example": "She had to pull the door to open it."
    },
    "purpose": {
        "definition": "the reason for which something is done or created or for which something exists",
        "example": "The purpose of the meeting is to discuss the new project."
    },
    "push": {
        "definition": "exert force on (someone or something) in order to move them away from oneself",
        "example": "She had to push the door to close it."
    },
    "put": {
        "definition": "move to or place in a particular position",
        "example": "She put the book on the shelf."
    },
    "quality": {
        "definition": "the standard of something as measured against other things of a similar kind; the degree of excellence of something",
        "example": "The quality of the product is excellent."
    },
    "question": {
        "definition": "a sentence worded or expressed so as to elicit information",
        "example": "She asked a difficult question."
    },
    "quickly": {
        "definition": "at a fast speed; rapidly",
        "example": "She finished her homework quickly."
    },
    "quite": {
        "definition": "to the utmost or most absolute extent or degree; absolutely; completely",
        "example": "The movie was quite interesting."
    },
    "race": {
        "definition": "a competition between runners, horses, vehicles, boats, etc., to see which is the fastest in covering a set course",
        "example": "She participated in a marathon race."
    },
    "radio": {
        "definition": "the transmission and reception of electromagnetic waves of radio frequency, especially those carrying sound messages",
        "example": "She listens to the radio every morning."
    },
    "raise": {
        "definition": "lift or move to a higher position or level",
        "example": "She raised her hand to ask a question."
    },
    "range": {
        "definition": "the area of variation between upper and lower limits on a particular scale",
        "example": "The store offers a wide range of products."
    },
    "rate": {
        "definition": "a measure, quantity, or frequency, typically one measured against some other quantity or measure",
        "example": "The interest rate for the loan is high."
    },
    "rather": {
        "definition": "used to indicate one's preference in a particular matter",
        "example": "She would rather stay home than go out."
    },
    "reach": {
        "definition": "stretch out an arm in a specified direction in order to touch or grasp something",
        "example": "He had to reach up to get the book from the top shelf."
    },
    "read": {
        "definition": "look at and comprehend the meaning of (written or printed matter) by mentally interpreting the characters or symbols of which it is composed",
        "example": "She likes to read books."
    },
    "ready": {
        "definition": "in a suitable state for an activity, action, or situation; fully prepared",
        "example": "She is ready to start the project."
    },
    "real": {
        "definition": "actually existing as a thing or occurring in fact; not imagined or supposed",
        "example": "The story is based on real events."
    },
    "reality": {
        "definition": "the state of things as they actually exist, as opposed to an idealistic or notional idea of them",
        "example": "She had to face the reality of the situation."
    },
    "realize": {
        "definition": "become fully aware of (something) as a fact; understand clearly",
        "example": "She didn't realize how late it was."
    },
    "really": {
        "definition": "in actual fact, as opposed to what is said or imagined to be true or possible",
        "example": "She really enjoys her job."
    },
    "reason": {
        "definition": "a cause, explanation, or justification for an action or event",
        "example": "She gave a valid reason for her absence."
    },
    "receive": {
        "definition": "be given, presented with, or paid (something)",
        "example": "She received a gift from her friend."
    },
    "recent": {
        "definition": "having happened, begun, or been done not long ago; belonging to a past period comparatively close to the present",
        "example": "She shared her recent travels with her friends."
    },
    "recently": {
        "definition": "at a recent time; not long ago",
        "example": "He recently moved to a new city."
    },
    "recognize": {
        "definition": "identify (someone or something) from having encountered them before; know again",
        "example": "She didn't recognize him at first."
    },
    "record": {
        "definition": "a thing constituting a piece of evidence about the past, especially an account kept in writing or some other permanent form",
        "example": "She kept a record of her expenses."
    },
    "red": {
        "definition": "of a color at the end of the spectrum next to orange and opposite violet, as of blood, fire, or rubies",
        "example": "She wore a red dress to the party."
    },
    "reduce": {
        "definition": "make smaller or less in amount, degree, or size",
        "example": "They aim to reduce waste by recycling."
    },
    "reflect": {
        "definition": "think deeply or carefully about",
        "example": "She took a moment to reflect on her achievements."
    },
    "region": {
        "definition": "an area, especially part of a country or the world having definable characteristics but not always fixed boundaries",
        "example": "They explored the mountainous region."
    },
    "relate": {
        "definition": "make or show a connection between",
        "example": "She could relate to his experiences."
    },
    "relationship": {
        "definition": "the way in which two or more concepts, objects, or people are connected, or the state of being connected",
        "example": "They have a close relationship."
    },
    "religious": {
        "definition": "relating to or believing in a religion",
        "example": "He is deeply religious and attends church regularly."
    },
    "remain": {
        "definition": "continue to exist, especially after other similar or related people or things have ceased to exist",
        "example": "Only a few ruins remain of the ancient city."
    },
    "remember": {
        "definition": "have in or be able to bring to one's mind an awareness of (someone or something from the past)",
        "example": "She can still remember her first day of school."
    },
    "remove": {
        "definition": "take (something) away or off from the position occupied",
        "example": "He decided to remove the old wallpaper."
    },
    "report": {
        "definition": "give a spoken or written account of something that one has observed, heard, done, or investigated",
        "example": "She wrote a report on the company's performance."
    },
    "represent": {
        "definition": "be entitled or appointed to act or speak for (someone), especially in an official capacity",
        "example": "The lawyer will represent the client in court."
    },
    "Republican": {
        "definition": "a member or supporter of the Republican Party in the United States",
        "example": "He is a registered Republican."
    },
    "require": {
        "definition": "need for a particular purpose",
        "example": "The project will require additional resources."
    },
    "research": {
        "definition": "the systematic investigation into and study of materials and sources in order to establish facts and reach new conclusions",
        "example": "She is conducting research on climate change."
    },
    "resource": {
        "definition": "a stock or supply of money, materials, staff, and other assets that can be drawn on by a person or organization in order to function effectively",
        "example": "They allocated more resources to the new project."
    },
    "respond": {
        "definition": "say something in reply",
        "example": "She didn't know how to respond to his question."
    },
    "response": {
        "definition": "a verbal or written answer",
        "example": "She received a quick response to her email."
    },
    "responsibility": {
        "definition": "the state or fact of having a duty to deal with something or of having control over someone",
        "example": "He takes his responsibilities seriously."
    },
    "rest": {
        "definition": "cease work or movement in order to relax, refresh oneself, or recover strength",
        "example": "She decided to rest after a long day."
    },
    "result": {
        "definition": "a consequence, effect, or outcome of something",
        "example": "The experiment yielded positive results."
    },
    "return": {
        "definition": "come or go back to a place or person",
        "example": "She decided to return the book to the library."
    },
    "reveal": {
        "definition": "make (previously unknown or secret information) known to others",
        "example": "She revealed the surprise party plans to her friend."
    },
    "rich": {
        "definition": "having a great deal of money or assets; wealthy",
        "example": "They live in a rich neighborhood."
    },
    "right": {
        "definition": "morally good, justified, or acceptable",
        "example": "She always tries to do the right thing."
    },
    "rise": {
        "definition": "move from a lower position to a higher one; come or go up",
        "example": "The sun will rise early in the morning."
    },
    "risk": {
        "definition": "a situation involving exposure to danger",
        "example": "She decided to take a risk and start her own business."
    },
    "road": {
        "definition": "a wide way leading from one place to another, especially one with a specially prepared surface which vehicles can use",
        "example": "They traveled down the winding road."
    },
    "rock": {
        "definition": "the solid mineral material forming part of the surface of the earth and other similar planets, exposed on the surface or underlying the soil or oceans",
        "example": "The children collected colorful rocks by the river."
    },
    "role": {
        "definition": "the function assumed or part played by a person or thing in a particular situation",
        "example": "He played the role of a hero in the movie."
    },
    "room": {
        "definition": "space that can be occupied or where something can be done",
        "example": "She redecorated her living room."
    },
    "rule": {
        "definition": "one of a set of explicit or understood regulations or principles governing conduct within a particular activity or sphere",
        "example": "The game has specific rules that must be followed."
    },
    "run": {
        "definition": "move at a speed faster than a walk, never having both or all the feet on the ground at the same time",
        "example": "She likes to run in the park every morning."
    },
    "safe": {
        "definition": "protected from or not exposed to danger or risk; not likely to be harmed or lost",
        "example": "The children are safe in the playground."
    },
    "same": {
        "definition": "identical; not different",
        "example": "They wore the same dress to the party."
    },
    "save": {
        "definition": "keep safe or rescue (someone or something) from harm or danger",
        "example": "She decided to save money for a vacation."
    },
    "say": {
        "definition": "utter words so as to convey information, an opinion, a feeling or intention, or an instruction",
        "example": "What did you say to her?"
    },
    "scene": {
        "definition": "the place where an incident in real life or fiction occurs or occurred",
        "example": "The movie's final scene was very emotional."
    },
    "school": {
        "definition": "an institution for educating children",
        "example": "They go to the same school."
    },
    "science": {
        "definition": "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment",
        "example": "She is fascinated by the wonders of science."
    },
    "scientist": {
        "definition": "a person who is studying or has expert knowledge of one or more of the natural or physical sciences",
        "example": "The scientist conducted experiments in the lab."
    },
    "score": {
        "definition": "the number of points, goals, runs, etc., achieved in a game or by a team or an individual",
        "example": "He was happy with his high score on the test."
    },
    "sea": {
        "definition": "the expanse of salt water that covers most of the earth's surface and surrounds its landmasses",
        "example": "They spent the day sailing on the sea."
    },
    "season": {
        "definition": "each of the four divisions of the year (spring, summer, autumn, and winter) marked by particular weather patterns and daylight hours, resulting from the earth's changing position with regard to the sun",
        "example": "Autumn is her favorite season."
    },
    "seat": {
        "definition": "a thing made or used for sitting on, such as a chair or stool",
        "example": "She found a comfortable seat in the theater."
    },
    "second": {
        "definition": "constituting number two in a sequence; coming after the first in time or order",
        "example": "She came in second place in the race."
    },
    "section": {
        "definition": "any of the more or less distinct parts into which something is or may be divided or from which it is made up",
        "example": "They explored a new section of the park."
    },
    "security": {
        "definition": "the state of being free from danger or threat",
        "example": "The building has tight security."
    },
    "see": {
        "definition": "perceive with the eyes; discern visually",
        "example": "She can see the mountains from her window."
    },
    "seek": {
        "definition": "attempt to find (something)",
        "example": "They seek advice from their mentors."
    },
    "seem": {
        "definition": "give the impression or sensation of being something or having a particular quality",
        "example": "It seems like a good idea."
    },
    "sell": {
        "definition": "give or hand over (something) in exchange for money",
        "example": "She decided to sell her old car."
    },
    "send": {
        "definition": "cause to go or be taken to a particular destination; arrange for the delivery of, especially by mail",
        "example": "He decided to send a letter to his friend."
    },
    "senior": {
        "definition": "of or for older or more experienced people",
        "example": "She is a senior member of the team."
    },
    "sense": {
        "definition": "a faculty by which the body perceives an external stimulus; one of the faculties of sight, smell, hearing, taste, and touch",
        "example": "She has a keen sense of smell."
    },
    "series": {
        "definition": "a number of things, events, or people of a similar kind or related nature coming one after another",
        "example": "She watched a new TV series on Netflix."
    },
    "serious": {
        "definition": "demanding or characterized by careful consideration or application",
        "example": "The situation is very serious and requires immediate attention."
    },
    "serve": {
        "definition": "perform duties or services for (another person or an organization)",
        "example": "She decided to serve in the local community center."
    },
    "service": {
        "definition": "the action of helping or doing work for someone",
        "example": "The restaurant provides excellent service."
    },
    "set": {
        "definition": "put, lay, or stand (something) in a specified place or position",
        "example": "She decided to set the table for dinner."
    },
    "seven": {
        "definition": "equivalent to the sum of three and four; one more than six, or three less than ten; 7",
        "example": "She bought seven apples from the market."
    },
    "several": {
        "definition": "more than two but not many",
        "example": "They visited several places during their trip."
    },
    "shake": {
        "definition": "move (an object) up and down or from side to side with rapid, forceful, jerky movements",
        "example": "She decided to shake the bottle before opening it."
    },
    "share": {
        "definition": "have a portion of (something) with another or others",
        "example": "They decided to share their lunch."
    },
    "she": {
        "definition": "used to refer to a woman, girl, or female animal previously mentioned or easily identified",
        "example": "She is my best friend."
    },
    "shoot": {
        "definition": "kill or wound (a person or animal) with a bullet or arrow",
        "example": "The hunter decided to shoot the deer."
    },
    "short": {
        "definition": "measuring a small distance from end to end",
        "example": "She wore a short dress to the party."
    },
    "shot": {
        "definition": "the act of discharging a firearm or releasing an arrow",
        "example": "He took a shot at the target."
    },
    "should": {
        "definition": "used to indicate obligation, duty, or correctness, typically when criticizing someone's actions",
        "example": "You should finish your homework before playing."
    },
    "shoulder": {
        "definition": "the upper joint of each of a person's arms and the part of the body between this and the neck",
        "example": "She felt a pain in her shoulder."
    },
    "show": {
        "definition": "be, allow, or cause to be visible",
        "example": "She decided to show him the new book she bought."
    },
    "side": {
        "definition": "a position to the left or right of an object, place, or central point",
        "example": "They walked along the side of the road."
    },
    "sign": {
        "definition": "an object, quality, or event whose presence or occurrence indicates the probable presence or occurrence of something else",
        "example": "She saw a sign that said 'No Parking'."
    },
    "significant": {
        "definition": "sufficiently great or important to be worthy of attention; noteworthy",
        "example": "The discovery was significant for the research community."
    },
    "similar": {
        "definition": "resembling without being identical",
        "example": "The two paintings are very similar."
    },
    "simple": {
        "definition": "easily understood or done; presenting no difficulty",
        "example": "The instructions were simple and easy to follow."
    },
    "since": {
        "definition": "from a time in the past until the time under consideration, typically the present",
        "example": "She has been studying since morning."
    },
    "sing": {
        "definition": "make musical sounds with the voice, especially words with a set tune",
        "example": "She loves to sing in the shower."
    },
    "single": {
        "definition": "only one; not one of several",
        "example": "He ordered a single slice of pizza."
    },
    "sister": {
        "definition": "a woman or girl in relation to other daughters and sons of her parents",
        "example": "She has an older sister."
    },
    "sit": {
        "definition": "adopt or be in a position in which one's weight is supported by one's buttocks rather than one's feet and one's back is upright",
        "example": "She decided to sit on the bench."
    },
    "site": {
        "definition": "an area of ground on which a town, building, or monument is constructed",
        "example": "The construction site was busy with workers."
    },
    "situation": {
        "definition": "a set of circumstances in which one finds oneself; a state of affairs",
        "example": "She handled the situation calmly."
    },
    "six": {
        "definition": "equivalent to the product of two and three; one more than five, or four less than ten; 6",
        "example": "There are six chairs around the table."
    },
    "size": {
        "definition": "the relative extent of something; a thing's overall dimensions or magnitude; how big something is",
        "example": "She was surprised by the size of the gift."
    },
    "skill": {
        "definition": "the ability to do something well; expertise",
        "example": "She has a lot of skill in painting."
    },
    "skin": {
        "definition": "the thin layer of tissue forming the natural outer covering of the body of a person or animal",
        "example": "He has very sensitive skin."
    },
    "small": {
        "definition": "of a size that is less than normal or usual",
        "example": "She lives in a small apartment."
    },
    "smile": {
        "definition": "form one's features into a pleased, kind, or amused expression, typically with the corners of the mouth turned up and the front teeth exposed",
        "example": "She greeted him with a smile."
    },
    "social": {
        "definition": "relating to society or its organization",
        "example": "He enjoys social gatherings."
    },
    "society": {
        "definition": "the aggregate of people living together in a more or less ordered community",
        "example": "Society plays a crucial role in shaping an individual's behavior."
    },
    "soldier": {
        "definition": "a person who serves in an army",
        "example": "The soldier received a medal for bravery."
    },
    "some": {
        "definition": "an unspecified amount or number of",
        "example": "She bought some groceries."
    },
    "somebody": {
        "definition": "an unspecified or unknown person",
        "example": "Somebody left their umbrella in the hall."
    },
    "someone": {
        "definition": "an unknown or unspecified person; some person",
        "example": "Someone called while you were out."
    },
    "something": {
        "definition": "a thing that is unspecified or unknown",
        "example": "She heard something moving in the bushes."
    },
    "sometimes": {
        "definition": "occasionally, rather than all of the time",
        "example": "Sometimes she goes for a walk in the evening."
    },
    "son": {
        "definition": "a boy or man in relation to either or both of his parents",
        "example": "Her son is in college."
    },
    "song": {
        "definition": "a short poem or other set of words set to music or meant to be sung",
        "example": "She wrote a beautiful song."
    },
    "soon": {
        "definition": "in or after a short time",
        "example": "She will be here soon."
    },
    "sort": {
        "definition": "a category of things or people having some common feature; a type",
        "example": "She likes this sort of music."
    },
    "sound": {
        "definition": "vibrations that travel through the air or another medium and can be heard when they reach a person's or animal's ear",
        "example": "She loves the sound of rain."
    },
    "source": {
        "definition": "a place, person, or thing from which something comes or can be obtained",
        "example": "The river is the main source of water for the village."
    },
    "south": {
        "definition": "the direction toward the point of the horizon 90\u00b0 clockwise from east, or the point on the horizon itself",
        "example": "They traveled to the south of the country."
    },
    "southern": {
        "definition": "situated in the south or directed toward or facing the south",
        "example": "They visited the southern part of the island."
    },
    "space": {
        "definition": "a continuous area or expanse which is free, available, or unoccupied",
        "example": "She found a parking space near the entrance."
    },
    "speak": {
        "definition": "say something in order to convey information, an opinion, or a feeling",
        "example": "She decided to speak up during the meeting."
    },
    "special": {
        "definition": "better, greater, or otherwise different from what is usual",
        "example": "She made a special effort to attend the event."
    },
    "specific": {
        "definition": "clearly defined or identified",
        "example": "She gave specific instructions for the task."
    },
    "speech": {
        "definition": "the expression of or the ability to express thoughts and feelings by articulate sounds",
        "example": "He gave an inspiring speech at the ceremony."
    },
    "spend": {
        "definition": "pay out (money) in buying or hiring goods or services",
        "example": "She decided to spend her savings on a new car."
    },
    "sport": {
        "definition": "an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment",
        "example": "She enjoys playing team sports."
    },
    "spring": {
        "definition": "the season after winter and before summer, in which vegetation begins to appear, in the northern hemisphere from March to May and in the southern hemisphere from September to November",
        "example": "Spring is her favorite season."
    },
    "staff": {
        "definition": "all the people employed by a particular organization",
        "example": "The hospital staff are very dedicated."
    },
    "stage": {
        "definition": "a point, period, or step in a process or development",
        "example": "They are in the final stage of the project."
    },
    "stand": {
        "definition": "have or maintain an upright position, supported by one's feet",
        "example": "She decided to stand by the window."
    },
    "standard": {
        "definition": "a level of quality or attainment",
        "example": "The product meets the industry standard."
    },
    "star": {
        "definition": "a fixed luminous point in the night sky which is a large, remote incandescent body like the sun",
        "example": "The stars twinkled in the clear night sky."
    },
    "start": {
        "definition": "begin or be reckoned from a particular point in time or space",
        "example": "They decided to start the meeting at 9 AM."
    },
    "state": {
        "definition": "the particular condition that someone or something is in at a specific time",
        "example": "The state of the economy is improving."
    },
    "statement": {
        "definition": "a definite or clear expression of something in speech or writing",
        "example": "She made a bold statement during the debate."
    },
    "station": {
        "definition": "a regular stopping place on a public transportation route, especially one on a railroad line with a platform and often one or more buildings",
        "example": "They waited at the train station."
    },
    "stay": {
        "definition": "remain in the same place",
        "example": "She decided to stay at home."
    },
    "step": {
        "definition": "an act or movement of putting one leg in front of the other in walking or running",
        "example": "She took a step forward."
    },
    "still": {
        "definition": "not moving or making a sound",
        "example": "The room was very still and quiet."
    },
    "stock": {
        "definition": "the goods or merchandise kept on the premises of a business or warehouse and available for sale or distribution",
        "example": "The store has a wide stock of books."
    },
    "stop": {
        "definition": "cause (an action, process, or event) to come to an end",
        "example": "She decided to stop the car at the red light."
    },
    "store": {
        "definition": "a retail establishment selling items to the public",
        "example": "They went to the store to buy groceries."
    },
    "story": {
        "definition": "an account of imaginary or real people and events told for entertainment",
        "example": "She wrote a short story for her class."
    },
    "strategy": {
        "definition": "a plan of action or policy designed to achieve a major or overall aim",
        "example": "They discussed the marketing strategy."
    },
    "street": {
        "definition": "a public road in a city or town, typically with houses and buildings on one or both sides",
        "example": "They walked down the busy street."
    },
    "strong": {
        "definition": "having the power to move heavy weights or perform other physically demanding tasks",
        "example": "He is very strong and can lift heavy objects."
    },
    "structure": {
        "definition": "the arrangement of and relations between the parts or elements of something complex",
        "example": "The structure of the organization is hierarchical."
    },
    "student": {
        "definition": "a person who is studying at a school or college",
        "example": "She is a diligent student."
    },
    "study": {
        "definition": "the devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books",
        "example": "She decided to study for her exams."
    },
    "stuff": {
        "definition": "matter, material, articles, or activities of a specified or indeterminate kind that are being referred to, indicated, or implied",
        "example": "She packed her stuff for the trip."
    },
    "style": {
        "definition": "a manner of doing something",
        "example": "Her style of writing is very unique."
    },
    "subject": {
        "definition": "a person or thing that is being discussed, described, or dealt with",
        "example": "She changed the subject during the conversation."
    },
    "success": {
        "definition": "the accomplishment of an aim or purpose",
        "example": "She achieved great success in her career."
    },
    "successful": {
        "definition": "accomplishing an aim or purpose",
        "example": "The project was successful."
    },
    "such": {
        "definition": "of the type previously mentioned",
        "example": "He had never seen such a beautiful sunset."
    },
    "suddenly": {
        "definition": "quickly and unexpectedly",
        "example": "The weather changed suddenly."
    },
    "suffer": {
        "definition": "experience or be subjected to (something bad or unpleasant)",
        "example": "She had to suffer through a difficult situation."
    },
    "suggest": {
        "definition": "put forward for consideration",
        "example": "She decided to suggest a new idea."
    },
    "summer": {
        "definition": "the warmest season of the year, in the northern hemisphere from June to August and in the southern hemisphere from December to February",
        "example": "They love going to the beach in summer."
    },
    "support": {
        "definition": "bear all or part of the weight of; hold up",
        "example": "She provided emotional support to her friend."
    },
    "sure": {
        "definition": "confident in what one thinks or knows; having no doubt that one is right",
        "example": "She was sure she had locked the door."
    },
    "surface": {
        "definition": "the outside part or uppermost layer of something (often used when describing its texture, form, or extent)",
        "example": "The surface of the table was smooth."
    },
    "system": {
        "definition": "a set of connected things or parts forming a complex whole, in particular",
        "example": "The solar system consists of eight planets."
    },
    "table": {
        "definition": "a piece of furniture with a flat top and one or more legs, providing a level surface on which objects may be placed",
        "example": "They sat around the table for dinner."
    },
    "take": {
        "definition": "lay hold of (something) with one's hands; reach for and hold",
        "example": "She decided to take the book from the shelf."
    },
    "talk": {
        "definition": "speak in order to give information or express ideas or feelings; converse or communicate by spoken words",
        "example": "They decided to talk about their plans."
    },
    "task": {
        "definition": "a piece of work to be done or undertaken",
        "example": "She completed the task on time."
    },
    "tax": {
        "definition": "a compulsory contribution to state revenue, levied by the government on workers' income and business profits, or added to the cost of some goods, services, and transactions",
        "example": "They paid their income tax."
    },
    "teach": {
        "definition": "show or explain to (someone) how to do something",
        "example": "She loves to teach mathematics to her students."
    },
    "teacher": {
        "definition": "a person who teaches, especially in a school",
        "example": "She is a dedicated teacher."
    },
    "team": {
        "definition": "a group of players forming one side in a competitive game or sport",
        "example": "They worked together as a team to win the game."
    },
    "technology": {
        "definition": "the application of scientific knowledge for practical purposes, especially in industry",
        "example": "Advancements in technology have changed the way we live."
    },
    "television": {
        "definition": "a system for transmitting visual images and sound that are reproduced on screens, chiefly used to broadcast programs for entertainment, information, and education",
        "example": "She watches her favorite shows on television."
    },
    "tell": {
        "definition": "communicate information, facts, or news to someone in spoken or written words",
        "example": "He decided to tell her the truth."
    },
    "ten": {
        "definition": "equivalent to the product of five and two; one more than nine, or four less than fourteen; 10",
        "example": "They baked ten cookies."
    },
    "tend": {
        "definition": "regularly or frequently behave in a particular way or have a certain characteristic",
        "example": "She tends to be very organized."
    },
    "term": {
        "definition": "a word or phrase used to describe a thing or to express a concept, especially in a particular kind of language or branch of study",
        "example": "The term 'biodiversity' encompasses the variety of life on Earth."
    },
    "test": {
        "definition": "a procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use",
        "example": "She studied hard for the math test."
    },
    "than": {
        "definition": "used to introduce the second element in a comparison",
        "example": "She is taller than her brother."
    },
    "thank": {
        "definition": "express gratitude to (someone), especially by saying 'Thank you'",
        "example": "She wanted to thank him for his help."
    },
    "that": {
        "definition": "used to identify a specific person or thing observed or heard by the speaker",
        "example": "She pointed to the book and said, 'I want that one.'"
    },
    "the": {
        "definition": "denoting one or more people or things already mentioned or assumed to be common knowledge",
        "example": "She walked to the store."
    },
    "their": {
        "definition": "belonging to or associated with the people or things previously mentioned or easily identified",
        "example": "They love their new home."
    },
    "them": {
        "definition": "used as the object of a verb or preposition to refer to two or more people or things previously mentioned or easily identified",
        "example": "She gave them the keys."
    },
    "themselves": {
        "definition": "used as the object of a verb or preposition to refer to two or more people or things previously mentioned as the subject of the clause",
        "example": "They prepared the meal themselves."
    },
    "then": {
        "definition": "at that time; at the time in question",
        "example": "She finished her homework and then went for a walk."
    },
    "theory": {
        "definition": "a supposition or a system of ideas intended to explain something, especially one based on general principles independent of the thing to be explained",
        "example": "She has a theory about why the experiment failed."
    },
    "there": {
        "definition": "in, at, or to that place or position",
        "example": "She left her bag over there."
    },
    "these": {
        "definition": "used to identify a specific person or thing close at hand or being indicated or experienced",
        "example": "These are my favorite shoes."
    },
    "they": {
        "definition": "used to refer to two or more people or things previously mentioned or easily identified",
        "example": "They are going to the concert tonight."
    },
    "thing": {
        "definition": "an object that one need not, cannot, or does not wish to give a specific name to",
        "example": "She couldn't remember the name of the thing she bought."
    },
    "think": {
        "definition": "have a particular opinion, belief, or idea about someone or something",
        "example": "She thinks it will rain tomorrow."
    },
    "third": {
        "definition": "constituting number three in a sequence; 3rd",
        "example": "She finished in third place in the competition."
    },
    "this": {
        "definition": "used to identify a specific person or thing close at hand or being indicated or experienced",
        "example": "This is my favorite book."
    },
    "those": {
        "definition": "used to identify a specific person or thing observed or heard by the speaker",
        "example": "Those are the books I was talking about."
    },
    "though": {
        "definition": "despite the fact that; although",
        "example": "Though it was raining, they went for a walk."
    },
    "thought": {
        "definition": "an idea or opinion produced by thinking or occurring suddenly in the mind",
        "example": "She had a sudden thought about the solution."
    },
    "thousand": {
        "definition": "the number equivalent to the product of a hundred and ten; 1,000",
        "example": "The city has a population of over a thousand people."
    },
    "threat": {
        "definition": "a person or thing likely to cause damage or danger",
        "example": "The storm posed a serious threat to the coastal town."
    },
    "three": {
        "definition": "equivalent to the sum of one and two; one more than two, or seven less than ten; 3",
        "example": "She has three cats."
    },
    "through": {
        "definition": "moving in one side and out of the other side of (an opening, channel, or location)",
        "example": "They walked through the park."
    },
    "throughout": {
        "definition": "in every part of (a place or object)",
        "example": "The news spread throughout the town."
    },
    "throw": {
        "definition": "propel (something) with force through the air by a movement of the arm and hand",
        "example": "She decided to throw the ball to her dog."
    },
    "thus": {
        "definition": "as a result or consequence of this; therefore",
        "example": "The project was successful, thus proving their hypothesis."
    },
    "time": {
        "definition": "the indefinite continued progress of existence and events in the past, present, and future regarded as a whole",
        "example": "They spent a lot of time together."
    },
    "to": {
        "definition": "expressing motion in the direction of (a particular location)",
        "example": "She decided to go to the store."
    },
    "today": {
        "definition": "on or in the course of this present day",
        "example": "She has a lot of work to do today."
    },
    "together": {
        "definition": "with or in proximity to another person or people",
        "example": "They worked together on the project."
    },
    "tonight": {
        "definition": "on the present or approaching evening or night",
        "example": "They have plans for dinner tonight."
    },
    "too": {
        "definition": "to a higher degree than is desirable, permissible, or possible; excessively",
        "example": "The coffee is too hot to drink."
    },
    "top": {
        "definition": "the highest or uppermost point, part, or surface of something",
        "example": "She climbed to the top of the hill."
    },
    "total": {
        "definition": "comprising the whole number or amount",
        "example": "The total cost of the trip was quite high."
    },
    "tough": {
        "definition": "strong enough to withstand adverse conditions or rough handling",
        "example": "She is a tough competitor."
    },
    "toward": {
        "definition": "in the direction of",
        "example": "They walked toward the park."
    },
    "town": {
        "definition": "an urban area that has a name, defined boundaries, and local government, and that is generally larger than a village and smaller than a city",
        "example": "They decided to explore the town."
    },
    "trade": {
        "definition": "the action of buying and selling goods and services",
        "example": "They engage in international trade."
    },
    "traditional": {
        "definition": "existing in or as part of a tradition; long-established",
        "example": "They celebrated with traditional dances."
    },
    "training": {
        "definition": "the action of teaching a person or animal a particular skill or type of behavior",
        "example": "She is undergoing training for her new job."
    },
    "travel": {
        "definition": "make a journey, typically of some length or abroad",
        "example": "They love to travel to new places."
    },
    "treat": {
        "definition": "behave toward or deal with in a certain way",
        "example": "She decided to treat herself to a nice dinner."
    },
    "treatment": {
        "definition": "medical care given to a patient for an illness or injury",
        "example": "He received treatment for his injury."
    },
    "tree": {
        "definition": "a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground",
        "example": "They planted a tree in the garden."
    },
    "trial": {
        "definition": "a formal examination of evidence before a judge, and typically before a jury, in order to decide guilt in a case of criminal or civil proceedings",
        "example": "The trial was widely covered by the media."
    },
    "trip": {
        "definition": "a journey or excursion, especially for pleasure",
        "example": "They went on a weekend trip to the beach."
    },
    "trouble": {
        "definition": "difficulty or problems that cause distress or worry",
        "example": "She had trouble understanding the instructions."
    },
    "true": {
        "definition": "in accordance with fact or reality",
        "example": "Her story was true."
    },
    "truth": {
        "definition": "the quality or state of being true",
        "example": "She always speaks the truth."
    },
    "try": {
        "definition": "make an attempt or effort to do something",
        "example": "She decided to try a new recipe."
    },
    "turn": {
        "definition": "move in a circular direction wholly or partly around an axis or point",
        "example": "She decided to turn the knob to open the door."
    },
    "TV": {
        "definition": "a system for transmitting visual images and sound that are reproduced on screens, chiefly used to broadcast programs for entertainment, information, and education",
        "example": "They watched their favorite show on TV."
    },
    "two": {
        "definition": "equivalent to the sum of one and one; one less than three; 2",
        "example": "She has two cats."
    },
    "type": {
        "definition": "a category of people or things having common characteristics",
        "example": "She prefers this type of music."
    },
    "under": {
        "definition": "extending or directly below",
        "example": "She found her keys under the couch."
    },
    "understand": {
        "definition": "perceive the intended meaning of (words, a language, or a speaker)",
        "example": "She took the time to understand the instructions."
    },
    "unit": {
        "definition": "an individual thing or person regarded as single and complete, especially for purposes of calculation",
        "example": "They formed a tight-knit unit."
    },
    "until": {
        "definition": "up to (the point in time or the event mentioned)",
        "example": "They waited until she arrived."
    },
    "up": {
        "definition": "toward a higher place or position",
        "example": "She looked up at the sky."
    },
    "upon": {
        "definition": "more formal term for on, especially in abstract senses",
        "example": "She placed the vase upon the table."
    },
    "us": {
        "definition": "used by a speaker to refer to himself or herself and one or more other people as the object of a verb or preposition",
        "example": "She gave us a tour of the museum."
    },
    "use": {
        "definition": "take, hold, or deploy (something) as a means of accomplishing a purpose or achieving a result; employ",
        "example": "She decided to use a pen to write the letter."
    },
    "usually": {
        "definition": "under normal conditions; generally",
        "example": "She usually goes for a run in the morning."
    },
    "value": {
        "definition": "the regard that something is held to deserve; the importance, worth, or usefulness of something",
        "example": "They place a high value on education."
    },
    "various": {
        "definition": "different from one another; of different kinds or sorts",
        "example": "She enjoys reading books on various topics."
    },
    "very": {
        "definition": "in a high degree",
        "example": "She is very talented."
    },
    "victim": {
        "definition": "a person harmed, injured, or killed as a result of a crime, accident, or other event or action",
        "example": "The victim of the accident was taken to the hospital."
    },
    "view": {
        "definition": "the ability to see something or to be seen from a particular place",
        "example": "She had a beautiful view of the ocean from her window."
    },
    "violence": {
        "definition": "behavior involving physical force intended to hurt, damage, or kill someone or something",
        "example": "They condemned all forms of violence."
    },
    "visit": {
        "definition": "go to see and spend time with (someone) socially",
        "example": "They decided to visit their grandparents."
    },
    "voice": {
        "definition": "the sound produced in a person's larynx and uttered through the mouth, as speech or song",
        "example": "She has a beautiful singing voice."
    },
    "vote": {
        "definition": "a formal indication of a choice between two or more candidates or courses of action, expressed typically through a ballot or a show of hands",
        "example": "They went to vote in the election."
    },
    "wait": {
        "definition": "stay where one is or delay action until a particular time or until something else happens",
        "example": "She decided to wait for the bus."
    },
    "walk": {
        "definition": "move at a regular pace by lifting and setting down each foot in turn, never having both feet off the ground at once",
        "example": "They decided to walk to the park."
    },
    "wall": {
        "definition": "a continuous vertical brick or stone structure that encloses or divides an area of land",
        "example": "She hung a picture on the wall."
    },
    "want": {
        "definition": "have a desire to possess or do (something); wish for",
        "example": "She wants to travel the world."
    },
    "war": {
        "definition": "a state of armed conflict between different countries or different groups within a country",
        "example": "The war lasted for several years."
    },
    "watch": {
        "definition": "look at or observe attentively over a period of time",
        "example": "They decided to watch a movie together."
    },
    "water": {
        "definition": "a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms",
        "example": "She drank a glass of water."
    },
    "way": {
        "definition": "a method, style, or manner of doing something; an optional or alternative form of action",
        "example": "She found a new way to solve the problem."
    },
    "we": {
        "definition": "used by a speaker to refer to himself or herself and one or more other people considered together",
        "example": "We decided to go on a road trip."
    },
    "weapon": {
        "definition": "a thing designed or used for inflicting bodily harm or physical damage",
        "example": "The soldier carried a weapon for protection."
    },
    "wear": {
        "definition": "have (something) on one's body as clothing, decoration, or protection",
        "example": "She decided to wear a red dress to the party."
    },
    "week": {
        "definition": "a period of seven days",
        "example": "They plan to go on vacation next week."
    },
    "weight": {
        "definition": "the force exerted on the mass of a body by a gravitational field",
        "example": "She decided to lift weights to build muscle."
    },
    "well": {
        "definition": "in a good or satisfactory way",
        "example": "She did well on her exam."
    },
    "west": {
        "definition": "the direction toward the point of the horizon where the sun sets at the equinoxes, on the left-hand side of a person facing north, or the part of the horizon lying in this direction",
        "example": "They decided to drive west to reach the coast."
    },
    "western": {
        "definition": "situated in the west, or directed toward or facing the west",
        "example": "They visited the western part of the country."
    },
    "what": {
        "definition": "asking for information specifying something",
        "example": "What is your favorite book?"
    },
    "whatever": {
        "definition": "used to emphasize a lack of restriction in referring to anything or amount",
        "example": "You can choose whatever you like."
    },
    "when": {
        "definition": "at what time",
        "example": "When will you arrive?"
    },
    "where": {
        "definition": "in or to what place or position",
        "example": "Where do you live?"
    },
    "whether": {
        "definition": "expressing a doubt or choice between alternatives",
        "example": "She couldn't decide whether to stay or leave."
    },
    "which": {
        "definition": "asking for information specifying one or more people or things from a definite set",
        "example": "Which color do you prefer?"
    },
    "while": {
        "definition": "a period of time",
        "example": "They talked for a while."
    },
    "white": {
        "definition": "of the color of milk or fresh snow, due to the reflection of most wavelengths of visible light; the opposite of black",
        "example": "She wore a white dress to the wedding."
    },
    "who": {
        "definition": "what or which person or people",
        "example": "Who is your favorite author?"
    },
    "whole": {
        "definition": "all of; entire",
        "example": "She read the whole book in one day."
    },
    "whom": {
        "definition": "used instead of 'who' as the object of a verb or preposition",
        "example": "To whom did you give the book?"
    },
    "whose": {
        "definition": "belonging to or associated with which person",
        "example": "Whose bag is this?"
    }
};