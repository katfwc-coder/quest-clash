// Original practice questions. These supplement learning; they are not an assessment of the full curriculum.
const SUBJECTS = [
{id:'maths',name:'Maths',icon:'÷',colour:'#b59aff',zone:'NUMBER NEBULA',desc:'Fractions, patterns & problem-solving'},
{id:'english',name:'English',icon:'Aa',colour:'#79c8ff',zone:'WORD WILDS',desc:'Reading, grammar & powerful writing'},
{id:'science',name:'Science',icon:'ϟ',colour:'#f8cf6c',zone:'SPARK STATION',desc:'Circuits, Earth & scientific thinking'},
{id:'biology',name:'Biology',icon:'❧',colour:'#89d6a0',zone:'LIVING LAGOON',desc:'Habitats, living things & ecosystems'},
{id:'chemistry',name:'Chemistry',icon:'⚗',colour:'#ff9c83',zone:'REACTION RIDGE',desc:'Materials, mixtures & changes'},
{id:'history',name:'History',icon:'⌛',colour:'#e3b580',zone:'TIME TEMPLE',desc:'Federation, migration & perspectives'},
{id:'music',name:'Music',icon:'♫',colour:'#ec9cda',zone:'MELODY MOUNTAIN',desc:'Rhythm, pitch & musical expression'},
{id:'geography',name:'Geography',icon:'◎',colour:'#76d6d0',zone:'WORLD WANDER',desc:'Places, connections & sustainability'},
{id:'digital',name:'Digital tech',icon:'⌘',colour:'#a3b6ff',zone:'CODE CANYON',desc:'Algorithms, data & online safety'},
{id:'health',name:'Health & wellbeing',icon:'♡',colour:'#ff9caa',zone:'TEAM TERRITORY',desc:'Teamwork, choices & wellbeing'}
];
const BANK = {
maths:[
['What is ¾ + ⅛?',['⅞','⅘','4/12','½'],0,'Write ¾ as 6/8. Then 6/8 + 1/8 = 7/8.'],
['A $60 game is 25% off. What is the sale price?',['$15','$35','$45','$50'],2,'25% is one quarter. A quarter of $60 is $15, so $60 − $15 = $45.'],
['Which number is prime?',['21','29','33','39'],1,'29 has exactly two positive factors: 1 and 29. The others can all be divided by 3 or 7.'],
['A rectangle is 8.5 m long and 4 m wide. What is its area?',['25 m²','34 m²','17 m²','12.5 m²'],1,'Area = length × width. 8.5 × 4 = 34 square metres.'],
['What is 3.6 ÷ 0.6?',['0.6','6','60','2.16'],1,'Multiply both numbers by 10: 36 ÷ 6 = 6.'],
['A fair six-sided die is rolled. What is the probability of an even number?',['⅙','⅓','½','⅔'],2,'There are three even outcomes (2, 4, 6) out of six equally likely outcomes: 3/6 = 1/2.'],
['The rule is “multiply by 3, then subtract 2”. What is the output for 7?',['13','19','23','15'],1,'First 7 × 3 = 21, then 21 − 2 = 19.'],
['The scores are 4, 7, 7, 8 and 9. What is the mean?',['7','8','6','9'],0,'Add all five scores to get 35, then divide by 5. The mean is 7.']
],
english:[
['“The wind whispered through the trees.” Which language feature is used?',['Simile','Personification','Alliteration only','A direct quote'],1,'Personification gives a non-human thing a human action. Wind cannot literally whisper.'],
['Choose the correctly punctuated sentence.',['Its raining; take youre coat.','It’s raining; take your coat.','Its raining; take your coat.','It’s raining; take you’re coat.'],1,'It’s means “it is”. Your shows ownership; you’re means “you are”.'],
['“Mia packed a torch and checked the sky. Dark clouds gathered.” What can you infer?',['Mia expects possible bad weather.','Mia is at the beach in sunshine.','Mia has lost her torch.','Mia dislikes reading.'],0,'The dark clouds suggest rain or a storm. An inference uses clues from the text and what you know.'],
['Which sentence uses a subordinate clause?',['The team cheered.','Although it was raining, we played.','We played and we won.','We played outside.'],1,'“Although it was raining” depends on the main clause “we played” to complete its meaning.'],
['A writer argues that a park should be protected. Which evidence best supports the argument?',['The writer likes green.','The park shelters several threatened species.','The park has a long name.','The writer visited once.'],1,'Evidence about threatened species directly supports the need to protect the park.'],
['Which sentence uses the passive voice?',['Ava painted the mural.','The mural was painted by Ava.','Ava is painting carefully.','Ava will paint tomorrow.'],1,'In the passive voice, the subject receives the action. The mural receives the painting action.'],
['“The path was treacherous, so we moved slowly and held the rail.” What does treacherous mean here?',['Very short','Dangerous','Brightly coloured','Crowded'],1,'Moving slowly and holding a rail are context clues that the path is dangerous.'],
['Which is the best opening for a formal letter to the principal?',['Hey mate!','Dear Principal,','Yo boss,','What’s up?'],1,'A formal greeting suits the audience and purpose of a respectful letter to a principal.']
],
science:[
['Why does a simple battery-powered bulb need a closed circuit?',['To trap light','To allow electric current to flow','To make the battery heavier','To stop all energy transfer'],1,'A complete conducting path lets electric current flow through the bulb. A gap breaks that path.'],
['Which material is the best electrical conductor?',['Rubber','Dry wood','Copper','Plastic'],2,'Metals such as copper conduct electricity well. Plastic and rubber are commonly used as insulators.'],
['A torch mainly transforms electrical energy into…',['Light and heat','Water','Chemical energy only','Gravity'],0,'A torch produces useful light and also transfers some energy as heat.'],
['When testing how water affects plant growth, which variable should you change?',['Water amount only','Water, soil and light together','Pot colour only','Every condition'],0,'Change the water amount and keep other relevant conditions the same to make a fair comparison.'],
['Which statement is an observation rather than an explanation?',['Heat made it expand.','The balloon’s width increased by 2 cm.','The gas particles moved faster.','It expanded because of the Sun.'],1,'An observation describes what was noticed or measured. An explanation proposes why it happened.'],
['Why do scientists repeat measurements?',['To guarantee their prediction is right','To check consistency and reduce random error','To avoid recording data','To change the question each time'],1,'Repeated measurements help reveal variation and make results more dependable.'],
['What causes day and night on Earth?',['Earth rotating on its axis','The Sun orbiting Earth','Clouds covering the Sun','The Moon blocking sunlight daily'],0,'As Earth rotates, places face towards the Sun (day) and then away from it (night).'],
['An open switch is added to a working series circuit. What happens?',['The bulb becomes brighter','The bulb goes out','The battery grows','The current flows faster'],1,'An open switch creates a gap, so current cannot flow around the circuit.']
],
biology:[
['A long drought dries a wetland. Which change most directly threatens its frogs?',['Less water for breeding','More street signs','A different calendar','Longer names for plants'],0,'Many frogs need water for eggs and tadpoles. A dry wetland removes important breeding habitat.'],
['In grass → grasshopper → frog → snake, which organism is a producer?',['Grass','Grasshopper','Frog','Snake'],0,'Grass makes its own food using sunlight. Producers supply energy to the rest of the food chain.'],
['If grasshopper numbers fall sharply, what might happen to frogs that eat them?',['Their food supply may decrease','They stop needing food','They become producers','They all grow wings'],0,'A change in one population can affect others. Fewer grasshoppers means less of this food for frogs.'],
['A plant is kept in darkness for weeks. Why might its growth slow?',['It cannot photosynthesise normally','It gets too much sunlight','Soil turns into glass','It needs no energy'],0,'Plants need light for photosynthesis, the process that uses light energy to make sugars.'],
['Which is a physical condition of a habitat?',['Temperature','A predator’s hunting','Competition for food','A bird eating seeds'],0,'Temperature is a non-living physical condition. Predation and competition involve living things.'],
['How do many desert plants benefit from a thick waxy leaf surface?',['It reduces water loss','It makes rain fall','It stops all growth','It attracts snow'],0,'A waxy surface can reduce evaporation, helping a plant conserve water in dry conditions.'],
['Why are decomposers important in an ecosystem?',['They recycle nutrients from dead matter','They remove all sunlight','They create plastic','They prevent any decay'],0,'Fungi and many bacteria break down dead material and return nutrients to the environment.'],
['To test how temperature affects germination, what should stay the same?',['Seed type and water amount','The temperature in every group','Nothing','Only the day you write the title'],0,'Keep seed type, water and other relevant conditions constant so temperature is the variable tested.']
],
chemistry:[
['Which change is usually reversible?',['Burning paper','Rusting iron','Melting ice','Cooking an egg'],2,'Melted ice is still water. Cooling it sufficiently turns it back into solid ice.'],
['Why is rusting classified as an irreversible chemical change?',['A new substance forms','The iron only changes shape','It is always fast','It makes ice'],0,'Iron reacts with oxygen and water to form rust, a different substance. Simply cooling it will not reverse this.'],
['Salt dissolves in water. How could you recover the salt?',['Let the water evaporate','Use an ordinary sieve','Freeze it into iron','Add more salt forever'],0,'When the water evaporates, the dissolved salt remains. Dissolving is a reversible change.'],
['Which is the best evidence that burning wood is a chemical change?',['New substances such as ash and gases form','The wood becomes shorter','The wood is moved','Its name changes'],0,'Chemical changes create new substances. A change in size alone does not prove a chemical change.'],
['Which method separates sand from water?',['Filtration','Magnetism','Dissolving','Melting'],0,'A filter can trap insoluble sand while allowing water to pass through.'],
['Water vapour cools and forms droplets on a cold glass. This is…',['Condensation','Melting','Burning','Dissolving'],0,'Condensation is a change from gas to liquid. It is a physical change and can be reversed by evaporation.'],
['Which change produces new substances?',['Tearing paper','Freezing juice','Baking cake batter','Crushing a can'],2,'Baking involves chemical reactions that create new substances. Tearing, freezing and crushing are physical changes.'],
['A student says dissolved sugar has disappeared. Which explanation is best?',['Sugar is still spread through the water','Sugar has become oxygen','Sugar no longer exists','Sugar has turned into sand'],0,'Dissolved sugar is still present in the solution. Removing the water can recover it.']
],
history:[
['What happened at Australian Federation in 1901?',['Six colonies united as a nation','Australia joined New Zealand','The first humans reached Australia','All states stopped existing'],0,'On 1 January 1901, six colonies federated to form the Commonwealth of Australia. They became states.'],
['Which is a primary source for a study of life in 1901?',['A diary written in 1901','A textbook published in 2025','A modern fictional film','A summary written yesterday'],0,'A diary created at the time offers direct evidence from that period. Its perspective still needs to be evaluated.'],
['Why should historians compare different accounts of an event?',['People may have different perspectives','Every source is identical','Only the longest source is true','Dates never matter'],0,'Sources reflect different experiences and viewpoints. Comparing them can reveal agreement, gaps and bias.'],
['What is one role of Australia’s Constitution?',['Set out the framework of federal government','List every street name','Choose every school lunch','Predict the weather'],0,'The Constitution sets out the structure and powers of the Australian Parliament, executive and judiciary.'],
['Why did many people migrate to Australia after World War II?',['For safety, family or new opportunities','Because there were no oceans','To join the Roman Empire','Because Australia had no people'],0,'Migration had many causes, including displacement by war, family connections and work opportunities.'],
['Why is it important to include First Nations perspectives in Australian history?',['They contribute knowledge and experiences often excluded','They make all sources identical','They remove the need for evidence','They began only in 1901'],0,'Aboriginal and Torres Strait Islander Peoples have continuing cultures and diverse experiences vital to understanding Australia.'],
['Which event happened first?',['Federation in 1901','The 1967 referendum','World War II ended in 1945','The First Fleet arrived in 1788'],3,'1788 comes before 1901, 1945 and 1967. First Nations histories extend far earlier than all these dates.'],
['The 1967 referendum changed the Constitution to allow the federal Parliament to make laws for Aboriginal people and…',['Include Aboriginal people in constitutional population counts','Give everyone citizenship for the first time','Create all Australian states','End all discrimination immediately'],0,'It changed two constitutional provisions. It did not itself grant citizenship or immediately end discrimination.']
],
music:[
['In 4/4 time, how many crotchet beats are in a full bar?',['2','3','4','8'],2,'The top 4 means four beats per bar; the bottom 4 means each beat has the value of a crotchet.'],
['What does crescendo ask a performer to do?',['Get gradually louder','Get gradually slower','Stop playing','Play every note twice'],0,'Crescendo means a gradual increase in volume. A tempo change is a change in speed.'],
['A repeated musical pattern is called an…',['Ostinato','Interval','Audience','Octave'],0,'An ostinato is a repeated rhythmic or melodic pattern that can support other musical parts.'],
['How many quavers have the same duration as one crotchet?',['1','2','3','4'],1,'A quaver is half the duration of a crotchet, so two quavers equal one crotchet.'],
['Which musical element describes the distinctive sound of a flute compared with a violin?',['Timbre','Tempo','Bar length','Silence'],0,'Timbre is tone colour: the quality that helps us recognise different voices and instruments.'],
['A piece follows the pattern A–B–A. What form is this?',['Ternary','Binary','A single repeated section only','A scale'],0,'Ternary form has three sections, with the first section returning after a contrasting middle section.'],
['What does tempo describe?',['The speed of the beat','The height of a note','The number of musicians','The loudness only'],0,'Tempo is the speed of the beat, often measured in beats per minute (BPM).'],
['Listen to the three notes. What happens to their pitch?',['It rises','It falls','It stays the same','There are no notes'],0,'Each note has a higher frequency than the one before, so the pitch rises.', 'rising']
],
geography:[
['Which continent is north of Australia?',['Asia','Antarctica','South America','Europe'],0,'Asia lies to Australia’s north. Indonesia is one of Australia’s closest northern neighbours.'],
['What does a map scale help you calculate?',['Real-world distance','The age of a mountain','Tomorrow’s rainfall','The population automatically'],0,'A map scale relates distances on a map to actual distances on the ground.'],
['Which choice best supports sustainable water use?',['Repair leaks and use rainwater where suitable','Leave taps running','Water paths at midday','Ignore leaking pipes'],0,'Reducing waste and using suitable alternative sources helps conserve limited fresh water.'],
['Why might two places at similar latitudes have different climates?',['Altitude and distance from oceans also matter','Latitude determines every detail','Maps change the weather','Both must be identical'],0,'Climate is influenced by several factors, including altitude, ocean currents and distance from the sea.'],
['What is one way Australia is connected to countries in Asia?',['Trade and migration','A shared land border with Japan','The same capital city','No travel or communication'],0,'Trade, migration, tourism and communication link Australia with many countries in Asia.'],
['A map key shows a blue line. What should you do before deciding what it means?',['Read the legend','Assume every blue line is a road','Ignore the symbol','Measure the title'],0,'A legend explains the symbols used on that particular map. Do not rely only on colour assumptions.'],
['Which is an example of a renewable energy source?',['Sunlight','Coal','Natural gas','Petroleum'],0,'Sunlight is naturally replenished. Fossil fuels take millions of years to form and are finite.'],
['Which question best investigates people’s connection to a place?',['Why is this place important to your community?','How many letters are in its name?','Is the map folded?','What colour is this worksheet?'],0,'Connections to place can involve culture, identity, history, livelihoods and personal experiences.']
],
digital:[
['What is an algorithm?',['An ordered set of steps to solve a task','A computer screen','Only a password','A type of battery'],0,'An algorithm describes steps and decisions that can be followed to complete a task.'],
['A loop repeats “move 3 steps” four times. How many steps are moved?',['7','12','34','1'],1,'Four repetitions of 3 steps gives 4 × 3 = 12 steps.'],
['A program says: IF score ≥ 10, show “Level up”. What happens when score is 10?',['It shows “Level up”','Nothing, because 10 is too small','It deletes the program','It always shows “Game over”'],0,'The symbol ≥ means greater than or equal to. A score of 10 meets the condition.'],
['An unexpected message asks for your password. What should you do?',['Do not share it; tell a trusted adult','Reply with the password','Send a friend’s password','Post it publicly'],0,'Keep passwords private. A trusted adult can help check and report suspicious messages.'],
['Which password strategy is strongest?',['A long, unique passphrase','Your first name','123456','The same short password everywhere'],0,'A long, unique passphrase is harder to guess. A trusted adult can help manage passwords safely.'],
['Why check the author and date of an online claim?',['To judge its reliability and relevance','To make it load faster','To guarantee it is true','To avoid comparing evidence'],0,'Authorship, date and supporting evidence help evaluate a claim. No single check guarantees accuracy.'],
['A sprite should turn left but turns right. Finding and fixing this error is called…',['Debugging','Downloading','Printing','Encrypting'],0,'Debugging means locating and correcting errors in an algorithm or program.'],
['Which data would best answer “How do students travel to school?”',['An anonymous count by travel method','Everyone’s passwords','A list of favourite movies','The school’s paint colour'],0,'Collect relevant data while minimising personal information. Travel-method counts answer the question.']
],
health:[
['A teammate makes a mistake. What response helps the team most?',['Offer encouragement and a useful suggestion','Laugh at them','Exclude them forever','Share an embarrassing clip'],0,'Respectful encouragement helps people learn and keeps the team welcoming.'],
['Someone online repeatedly sends hurtful messages. What is a useful next step?',['Save evidence and tell a trusted adult','Keep it secret forever','Send threats back','Share private details'],0,'A trusted adult can help you save evidence, block or report the behaviour, and get support.'],
['A friend says “no” to a game that makes them uncomfortable. What should you do?',['Respect their choice and suggest another activity','Keep pressuring them','Mock them','Ignore their answer'],0,'Respecting boundaries helps everyone feel safe and included. Consent can also be changed.'],
['You are frustrated during a challenge. Which strategy could help?',['Pause, breathe and ask for support','Insult another player','Keep going without any break','Break something'],0,'A pause and slow breathing can help you settle. Asking for support is a useful skill.'],
['Which is an inclusive way to organise a playground game?',['Adapt rules so different abilities can participate','Pick only the fastest students','Ban newcomers','Never explain the rules'],0,'Adapting equipment, roles or rules can make participation fairer and more enjoyable.'],
['An advertisement says a snack will make everyone popular. What should you question?',['Whether evidence supports the claim','Whether the packet has a colour','Whether everyone must buy it','Whether popularity is guaranteed'],0,'Advertising can use emotional appeals. Question the evidence and the message rather than accepting a promise.'],
['You and a friend disagree about a rule. What is a fair first step?',['Listen to each view and discuss the rule calmly','Shout louder','Walk away with their equipment','Make a secret rule'],0,'Listening and respectful discussion help resolve conflict. An adult can help if needed.'],
['Why is taking breaks from long gaming sessions helpful?',['It gives your body and attention a change','It makes you forget everything','It replaces all sleep','It means you failed'],0,'Breaks create time to move, rest your eyes and do other activities. You can return refreshed.']
]};
