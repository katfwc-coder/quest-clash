// Stable appended IDs preserve saved learning history and shared rounds.
const TYPED_PROBLEMS=[
['maths',6,'A class needs 96 seedlings. Trays contain 8 seedlings and cost $6 each. How many dollars will all the trays cost?',72,'dollars','96 ÷ 8 = 12 trays. 12 × 6 = 72 dollars.'],
['maths',6,'A walking route is 3.5 km. You walk 1250 m before lunch and 875 m afterwards. How many metres remain?',1375,'m','3500 − 1250 − 875 = 1375 metres.'],
['maths',6,'A tank is three-quarters full. After 18 litres are used, it is half full. What is its full capacity in litres?',72,'L','The 18 litres used represent one-quarter of the capacity. 18 × 4 = 72 litres.'],
['maths',7,'A jacket costs $120 before a 25% discount. Delivery costs $8. What is the total cost in dollars?',98,'dollars','A quarter of 120 is 30. The discounted cost is 90; delivery brings it to 98.'],
['maths',7,'A recipe uses flour and oats in the ratio 5:3. A batch contains 640 g of these two ingredients. How many grams are oats?',240,'g','There are 8 parts, each weighing 80 g. Oats use 3 parts: 240 g.'],
['maths',7,'Four quiz scores have a mean of 16. The first three scores are 12, 18 and 15. What is the fourth score?',19,'','The total must be 4 × 16 = 64. Subtract 12 + 18 + 15 = 45 to get 19.'],
['maths',8,'A taxi charges $5 plus $2.40 per kilometre. The fare is $33.80. How many kilometres were travelled?',12,'km','Subtract 5, then divide 28.80 by 2.40 to get 12 km.'],
['maths',8,'A rectangular garden is 4 m longer than it is wide. Its perimeter is 40 m. What is its width in metres?',8,'m','2w + 2(w + 4) = 40, so 4w = 32 and w = 8.'],
['maths',8,'A bag has 3 red and 2 blue counters. Two are drawn without replacement. What is the probability that both are blue? Give a fraction or decimal.',0.1,'','The probability is 2/5 × 1/4 = 1/10 = 0.1.'],
['maths',9,'A right-angled triangle has a hypotenuse of 13 cm and one shorter side of 5 cm. How long is the other side in centimetres?',12,'cm','The missing side is √(13² − 5²) = √144 = 12 cm.'],
['maths',9,'Two adult tickets and three child tickets cost $54. An adult ticket costs twice as much as a child ticket. What does one child ticket cost in dollars? Give your answer to two decimal places.',7.71,'dollars','If a child ticket costs c, then 2(2c) + 3c = 54. c = 54/7, which rounds to $7.71.'],
['maths',9,'An item rises in price from $80 to $92. What is the percentage increase? Enter the percentage number.',15,'%','The increase is 12. 12 ÷ 80 × 100 = 15%.'],
['maths',10,'A rectangular poster has area 96 square centimetres. Its length is 4 cm more than its width. Find the width in centimetres.',8,'cm','w(w + 4) = 96. (w − 8)(w + 12) = 0; a positive width is 8 cm.'],
['maths',10,'An investment of $800 grows by 5% per year, compounded annually. What is its value in dollars after two years?',882,'dollars','800 × 1.05² = 882 dollars.'],
['maths',10,'A line passes through (2, 7) and (6, 19). What is the y-intercept?',1,'','The gradient is (19 − 7)/(6 − 2) = 3. In y = 3x + b, 7 = 6 + b, so b = 1.'],
['maths',11,'A ball has height h(t) = −5t² + 20t + 1 metres. What is its maximum height in metres?',21,'m','The vertex occurs at t = −20/(2 × −5) = 2. h(2) = −20 + 40 + 1 = 21.'],
['maths',11,'A geometric sequence starts at 6 and doubles each term. What is the sum of its first five terms?',186,'','6 + 12 + 24 + 48 + 96 = 186.'],
['maths',11,'A fair coin is tossed four times. What is the probability of exactly three heads? Give a fraction or decimal.',0.25,'','There are 4 ways to place the tail among 16 equally likely outcomes. 4/16 = 1/4.'],
['maths',12,'A particle has position s(t) = t³ − 6t² + 9t metres. Find its velocity in metres per second at t = 4.',9,'m/s','Differentiate: v(t) = 3t² − 12t + 9. v(4) = 48 − 48 + 9 = 9 m/s.'],
['maths',12,'Water enters a tank at rate r(t) = 2t + 3 litres per minute. How many litres enter between t = 0 and t = 4?',28,'L','Integrate from 0 to 4: [t² + 3t] = 16 + 12 = 28 litres.'],
['maths',12,'A discrete random variable takes values 0, 2 and 5 with probabilities 0.2, 0.5 and 0.3. Find its expected value.',2.5,'','E(X) = 0 × 0.2 + 2 × 0.5 + 5 × 0.3 = 2.5.'],
['logic',6,'A robot starts at square 4 on a number line. It repeats “forward 3, back 1” five times. At which square does it finish?',14,'','Each pair moves it forward 2. Five pairs move it 10 squares: 4 + 10 = 14.'],
['logic',6,'A code replaces each letter with its alphabet position, then adds the numbers. A is 1 and Z is 26. What is the code total for DOG?',26,'','D = 4, O = 15 and G = 7. Their total is 26.'],
['logic',6,'Four friends each shake hands with every other friend once. How many handshakes happen in total?',6,'','Each friend meets 3 others, but each handshake is counted twice: 4 × 3 ÷ 2 = 6.'],
['logic',7,'A machine multiplies its input by 3, then subtracts 7. Its output is 38. What was its input?',15,'','Reverse the operations: (38 + 7) ÷ 3 = 15.'],
['logic',7,'A lock code is a three-digit number. Its hundreds digit is 4; its tens digit is twice its units digit; the digits sum to 13. What is the code?',463,'','The last two digits total 9. If the units digit is u, 2u + u = 9, so u = 3 and the tens digit is 6.'],
['logic',7,'A task takes 5 minutes. Three robots can each complete one task at a time, starting together. What is the minimum number of minutes to finish 8 tasks?',15,'minutes','The robots finish 3 tasks in each 5-minute batch. Three batches are needed for 8 tasks: 15 minutes.'],
['logic',8,'A binary number has place values 16, 8, 4, 2, 1 from left to right. What decimal number is represented by 10110?',22,'','The active places are 16, 4 and 2. Their sum is 22.'],
['logic',8,'A route must take exactly 3 steps east and 2 steps north, in any order. How many different step sequences reach the destination?',10,'','Choose the two north-step positions among five: 5 × 4 ÷ 2 = 10.'],
['logic',8,'A printer numbers pages from 1 to 120. How many times does the digit 2 appear in those page numbers?',23,'','From 1 to 99, it appears 10 times in units and 10 in tens. From 100 to 120, it appears in 102, 112 and 120: 23 total.']
];
const typedSpecs=new Map(),typedRows=[];
for(const id of ['maths','logic']){
 const original=BANK[id],start=original.length,rows=[];
 TYPED_PROBLEMS.forEach(([subject,year,prompt,value,unit,why],n)=>{
  if(subject!==id)return;
  const tier=({6:2,7:5,8:8,9:10,10:12,11:14,12:16})[year];
  const q=[prompt,[String(value),String(value+1),String(value+2),String(value+3)],0,why,null,null,'typed-problem-'+n,tier,year];
  const index=start+rows.length,spec={value,unit};rows.push(q);typedSpecs.set(id+':'+index,spec);typedRows.push({id,index,q,tier,year});
 });
 BANK[id]=new Proxy(original,{get(t,p,r){if(p==='length')return start+rows.length;if(typeof p==='string'&&/^\d+$/.test(p)&&+p>=start)return rows[+p-start];return Reflect.get(t,p,r)},has(t,p){return typeof p==='string'&&/^\d+$/.test(p)&&+p>=start&&+p<start+rows.length||Reflect.has(t,p)}});
}
const typedPoolsBase=makeQualityPools;
makeQualityPools=function(){const pools=typedPoolsBase();for(const row of typedRows){const group=questionGroup(row);if(!pools[row.id].has(group))pools[row.id].set(group,[{index:row.index,tier:row.tier,year:row.year}])}return pools};
QUESTION_COUNT=Object.keys(BANK).reduce((n,id)=>n+eligibleBankLength(id),0);
const typedSeniorSpecs=new Map();
for(const [id,year,prompt,value,unit,why] of TYPED_PROBLEMS){if(id!=='maths'||year<10)continue;addSenior(year,'Mathematics',prompt,[value,value+1,value+2,value+3],why,'typed-'+year+'-'+value);typedSeniorSpecs.set(SENIOR_BANK[year].at(-1).id,{value,unit})}

// Parse only numbers and simple fractions, never expressions or executable input.
function typedNumber(raw,unit=''){
 let s=String(raw).normalize('NFKC').trim().toLowerCase().replace(/−/g,'-');
 if(s.length>80)return null;
 const units={dollars:/\s*(?:dollars?|aud)$/,m:/\s*(?:m|metres?|meters?)$/,km:/\s*(?:km|kilometres?|kilometers?)$/,cm:/\s*(?:cm|centimetres?|centimeters?)$/,g:/\s*(?:g|grams?)$/,L:/\s*(?:l|litres?|liters?)$/,minutes:/\s*(?:min|minutes?)$/,'%':/\s*%$/,'m/s':/\s*(?:m\/s|metres per second|meters per second)$/};
 if(unit==='dollars')s=s.replace(/^\$\s*/,'');
 if(units[unit])s=s.replace(units[unit],'').trim();
 const number='[+-]?(?:(?:\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.\\d*)?|\\.\\d+)';
 if(new RegExp('^'+number+'$').test(s))return Number(s.replace(/,/g,''));
 const fraction=s.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
 if(fraction&&Number(fraction[2])!==0)return Number(fraction[1])/Number(fraction[2]);
 return null;
}
function typedCorrect(raw,spec){const n=typedNumber(raw,spec.unit);return n!==null&&Number.isFinite(n)&&Math.abs(n-spec.value)<1e-9}
function typedForm(spec,senior=false){return `<form id="typed-answer-form" data-typed-senior="${senior}"><span class="difficulty-tag">SOLVE IT · TYPE YOUR ANSWER</span><label for="typed-answer">Your answer${spec.unit?' ('+safeText(spec.unit)+')':''}</label><div class="typed-entry"><input id="typed-answer" name="answer" type="text" inputmode="text" maxlength="80" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="typed-help typed-error" required><button class="primary" type="submit">Check answer →</button></div><p id="typed-help">${spec.unit?'Use '+safeText(spec.unit)+'. You may leave out the unit. ':'Enter a number. '}Equivalent fractions and decimals are accepted. Work it out on paper if helpful.</p><p id="typed-error" role="alert"></p></form>`}
const typedAskBase=ask;
ask=function(){typedAskBase();const spec=quiz&&typedSpecs.get(questionKey(quiz.item));if(spec&&!quiz.answered){const box=document.querySelector('.answers');if(box)box.outerHTML=typedForm(spec)}};
const typedShowSeniorBase=showSeniorQuestion;
showSeniorQuestion=function(){typedShowSeniorBase();const spec=seniorRound&&typedSeniorSpecs.get(seniorRound.deck[seniorRound.pos].id);if(spec){const box=document.querySelector('.answers');if(box)box.outerHTML=typedForm(spec,true)}};
// Reuse the existing scoring, timer, bonus, history and multiplayer answer path.
const typedAnswerBase=answer;
answer=function(n){if(!quiz||quiz.answered)return;const spec=quiz&&typedSpecs.get(questionKey(quiz.item));typedAnswerBase(n);if(spec&&quiz?.answered){document.querySelector('#typed-answer-form input')?.setAttribute('disabled','');document.querySelector('#typed-answer-form button')?.setAttribute('disabled','');document.querySelector('#answer-feedback')?.insertAdjacentHTML('beforeend',`<p class="typed-solution">Correct answer: <strong>${safeText(spec.value)} ${safeText(spec.unit)}</strong></p>`)}};
document.addEventListener('submit',event=>{
 if(event.target.id!=='typed-answer-form')return;event.preventDefault();
 const senior=event.target.dataset.typedSenior==='true',r=senior?seniorRound:quiz;
 if(!r||r.answered)return;
 if(!senior&&r.timed&&Date.now()>=r.deadline){tickQuestionClock();return}
 const spec=senior?typedSeniorSpecs.get(r.deck[r.pos].id):typedSpecs.get(questionKey(r.item));if(!spec)return;
 const raw=document.querySelector('#typed-answer').value;
 if(typedNumber(raw,spec.unit)===null){document.querySelector('#typed-error').textContent='Enter a number or fraction, using the unit shown. For example: 12.5 or 3/4.';return}
 const correct=typedCorrect(raw,spec),index=r.options.findIndex(o=>senior?(o.index===0)===correct:(o.i===r.item.q[2])===correct);
 if(senior){answerSenior(index);event.target.querySelector('input').disabled=true;event.target.querySelector('button').disabled=true;document.querySelector('[data-senior-next]')?.focus()}else answer(index);
});
if(!game&&!live&&!quiz)navigate('home');
