import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#060d1a",
  bgGrad: "linear-gradient(160deg, #060d1a 0%, #0a1628 50%, #06111f 100%)",
  card: "#0d1b2e",
  cardHover: "#112236",
  border: "#1a2f4a",
  borderGlow: "#00d4ff33",
  accent: "#00d4ff",
  accentDark: "#0099cc",
  gold: "#ffd700",
  goldDark: "#cc9900",
  success: "#00e676",
  error: "#ff5252",
  warn: "#ffab40",
  text: "#e8f4ff",
  muted: "#6b8aaa",
  purple: "#a78bfa",
  teal: "#14b8a6",
};

// ─── QUESTION BANK (500+) ────────────────────────────────────────────────────
const QB = [
  // HISTORY
  { id:1, topic:"History", sub:"General Studies", group:["G1","G2","G2A","G4","VAO"], q:"Who is known as the 'Father of Indian Constitution'?", opts:["Mahatma Gandhi","B.R. Ambedkar","Jawaharlal Nehru","Sardar Patel"], ans:1, exp:"Dr. B.R. Ambedkar chaired the Drafting Committee of the Constitution.", diff:"easy" },
  { id:2, topic:"History", sub:"General Studies", group:["G1","G2","G2A","G4","VAO"], q:"The Battle of Plassey was fought in which year?", opts:["1757","1761","1764","1799"], ans:0, exp:"Battle of Plassey (1757) — British East India Company defeated Siraj-ud-Daulah.", diff:"medium" },
  { id:3, topic:"History", sub:"General Studies", group:["G1","G2","G4"], q:"Who founded the Indian National Congress in 1885?", opts:["Dadabhai Naoroji","A.O. Hume","Bal Gangadhar Tilak","Gopal Krishna Gokhale"], ans:1, exp:"Allan Octavian Hume, a retired British civil servant, founded the INC in 1885.", diff:"easy" },
  { id:4, topic:"History", sub:"General Studies", group:["G1","G2","G4"], q:"The Quit India Movement was launched in which year?", opts:["1940","1942","1944","1946"], ans:1, exp:"The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942.", diff:"easy" },
  { id:5, topic:"History", sub:"General Studies", group:["G1","G2","G2A"], q:"Who gave the slogan 'Jai Hind'?", opts:["Bhagat Singh","Subhas Chandra Bose","Lal Bal Pal","Jawaharlal Nehru"], ans:1, exp:"Subhas Chandra Bose popularized 'Jai Hind' as the rallying cry of INA.", diff:"easy" },
  { id:6, topic:"History", sub:"General Studies", group:["G1","G2"], q:"Champaran Satyagraha (1917) was related to which issue?", opts:["Salt tax","Indigo cultivation","Land revenue","Mill workers"], ans:1, exp:"Gandhi led the Champaran Satyagraha against forced indigo cultivation by British planters.", diff:"medium" },
  { id:7, topic:"History", sub:"General Studies", group:["G1","G2","G4"], q:"The first Governor General of independent India was?", opts:["Lord Mountbatten","C. Rajagopalachari","Rajendra Prasad","Jawaharlal Nehru"], ans:0, exp:"Lord Mountbatten was the first Governor General of independent India (1947–1948).", diff:"medium" },
  { id:8, topic:"History", sub:"General Studies", group:["G2","G4","VAO"], q:"Poona Pact (1932) was between Gandhi and?", opts:["Jinnah","Ambedkar","Nehru","Gokhale"], ans:1, exp:"The Poona Pact was signed between Mahatma Gandhi and Dr. B.R. Ambedkar on separate electorates.", diff:"medium" },
  { id:9, topic:"History", sub:"General Studies", group:["G1","G2","G2A"], q:"Who wrote 'Discovery of India'?", opts:["Mahatma Gandhi","Rajendra Prasad","Jawaharlal Nehru","Sardar Patel"], ans:2, exp:"'Discovery of India' was written by Jawaharlal Nehru while imprisoned at Ahmednagar Fort.", diff:"easy" },
  { id:10, topic:"History", sub:"General Studies", group:["G1","G2","G4"], q:"The partition of Bengal was done by which Viceroy?", opts:["Lord Curzon","Lord Dalhousie","Lord Ripon","Lord Lytton"], ans:0, exp:"Lord Curzon partitioned Bengal in 1905, which led to massive protests and the Swadeshi Movement.", diff:"medium" },
  // GEOGRAPHY
  { id:11, topic:"Geography", sub:"General Studies", group:["G1","G2","G4","VAO"], q:"Which river is known as the 'Ganga of the South'?", opts:["Cauvery","Krishna","Godavari","Tungabhadra"], ans:2, exp:"Godavari is called 'Dakshina Ganga' due to its length and religious importance.", diff:"easy" },
  { id:12, topic:"Geography", sub:"General Studies", group:["G1","G2","G4","VAO"], q:"The highest peak in Tamil Nadu is?", opts:["Doddabetta","Anaimudi","Kodaikanal Peak","Velliangiri"], ans:0, exp:"Doddabetta (2637m) in the Nilgiris is the highest peak in Tamil Nadu.", diff:"medium" },
  { id:13, topic:"Geography", sub:"General Studies", group:["G2","G4","VAO"], q:"Which district of Tamil Nadu has the longest coastline?", opts:["Chennai","Ramanathapuram","Thoothukudi","Nagapattinam"], ans:1, exp:"Ramanathapuram district has the longest coastline in Tamil Nadu.", diff:"hard" },
  { id:14, topic:"Geography", sub:"General Studies", group:["G1","G2","G2A"], q:"The Palk Strait separates India from?", opts:["Maldives","Sri Lanka","Bangladesh","Myanmar"], ans:1, exp:"The Palk Strait is a narrow strip of water between Tamil Nadu and Sri Lanka.", diff:"easy" },
  { id:15, topic:"Geography", sub:"General Studies", group:["G2","G4","VAO"], q:"Which is the largest river in Tamil Nadu?", opts:["Palar","Cauvery","Vaigai","Tamiraparani"], ans:1, exp:"Cauvery is the largest river in Tamil Nadu, also known as 'Ponni'.", diff:"easy" },
  { id:16, topic:"Geography", sub:"General Studies", group:["G1","G2"], q:"Deccan Plateau is mainly composed of which rock?", opts:["Granite","Basalt","Limestone","Sandstone"], ans:1, exp:"The Deccan Plateau is formed by volcanic basalt rock (Deccan Traps).", diff:"medium" },
  { id:17, topic:"Geography", sub:"General Studies", group:["G1","G2","G4"], q:"Which state has the largest area in India?", opts:["Maharashtra","Madhya Pradesh","Rajasthan","Uttar Pradesh"], ans:2, exp:"Rajasthan is the largest state in India by area.", diff:"easy" },
  { id:18, topic:"Geography", sub:"General Studies", group:["G2","G4","VAO"], q:"Mullaiperiyar dam is located in which state?", opts:["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh"], ans:1, exp:"Mullaiperiyar Dam is located in Idukki district of Kerala, but owned by Tamil Nadu.", diff:"medium" },
  // POLITY
  { id:19, topic:"Polity", sub:"General Studies", group:["G1","G2","G2A"], q:"How many Fundamental Rights does the Indian Constitution guarantee?", opts:["5","6","7","8"], ans:1, exp:"6 Fundamental Rights: Equality, Freedom, Against Exploitation, Religion, Cultural-Educational, Constitutional Remedies.", diff:"easy" },
  { id:20, topic:"Polity", sub:"General Studies", group:["G1","G2","G4","VAO"], q:"The concept of 'Welfare State' is enshrined in which part of the Constitution?", opts:["Preamble","Fundamental Rights","Directive Principles","Fundamental Duties"], ans:2, exp:"Directive Principles of State Policy (Part IV) enshrine the concept of a Welfare State.", diff:"medium" },
  { id:21, topic:"Polity", sub:"General Studies", group:["G1","G2","G2A"], q:"Article 370 was related to which state?", opts:["Punjab","Jammu & Kashmir","Nagaland","Mizoram"], ans:1, exp:"Article 370 granted special status to Jammu & Kashmir (abrogated in August 2019).", diff:"easy" },
  { id:22, topic:"Polity", sub:"General Studies", group:["G2","G4","VAO"], q:"The Right to Education Act was passed in which year?", opts:["2005","2008","2009","2010"], ans:2, exp:"The Right of Children to Free and Compulsory Education Act was passed in 2009.", diff:"medium" },
  { id:23, topic:"Polity", sub:"General Studies", group:["G1","G2","G4"], q:"Who appoints the Chief Election Commissioner of India?", opts:["Prime Minister","President","Parliament","Supreme Court"], ans:1, exp:"The Chief Election Commissioner is appointed by the President of India.", diff:"easy" },
  { id:24, topic:"Polity", sub:"General Studies", group:["G1","G2","G2A"], q:"The 73rd Constitutional Amendment is related to?", opts:["Municipalities","Panchayati Raj","Reservation","Finance Commission"], ans:1, exp:"The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions.", diff:"medium" },
  { id:25, topic:"Polity", sub:"General Studies", group:["G2","G4","VAO"], q:"How many members are in the Rajya Sabha (maximum)?", opts:["238","245","250","256"], ans:1, exp:"Rajya Sabha has a maximum of 245 members — 233 elected + 12 nominated by President.", diff:"medium" },
  // ECONOMY
  { id:26, topic:"Economy", sub:"General Studies", group:["G1","G2","G2A"], q:"Which Five-Year Plan focused on 'Garibi Hatao'?", opts:["4th Plan","5th Plan","6th Plan","7th Plan"], ans:1, exp:"5th Five-Year Plan (1974–78) focused on 'Garibi Hatao' (Remove Poverty) and self-reliance.", diff:"medium" },
  { id:27, topic:"Economy", sub:"General Studies", group:["G1","G2"], q:"NABARD was established in which year?", opts:["1975","1982","1985","1990"], ans:1, exp:"NABARD (National Bank for Agriculture and Rural Development) was established on July 12, 1982.", diff:"medium" },
  { id:28, topic:"Economy", sub:"General Studies", group:["G2","G4","VAO"], q:"GST was implemented in India from?", opts:["April 2016","January 2017","July 2017","April 2018"], ans:2, exp:"Goods and Services Tax (GST) was implemented from July 1, 2017.", diff:"easy" },
  { id:29, topic:"Economy", sub:"General Studies", group:["G1","G2","G2A"], q:"The term 'Stagflation' refers to?", opts:["High growth + High inflation","Low growth + High inflation","High growth + Low inflation","Low growth + Low inflation"], ans:1, exp:"Stagflation = Stagnation + Inflation — economic stagnation with high inflation simultaneously.", diff:"hard" },
  { id:30, topic:"Economy", sub:"General Studies", group:["G2","G4","VAO"], q:"India's first Five-Year Plan began in which year?", opts:["1947","1950","1951","1956"], ans:2, exp:"India's First Five-Year Plan was launched in 1951 under PM Jawaharlal Nehru.", diff:"easy" },
  // SCIENCE
  { id:31, topic:"Science", sub:"General Studies", group:["G2","G4","VAO"], q:"What is the chemical formula of water?", opts:["H2O2","HO","H2O","H3O"], ans:2, exp:"Water (H2O) — two hydrogen atoms bonded to one oxygen atom.", diff:"easy" },
  { id:32, topic:"Science", sub:"General Studies", group:["G2","G4","VAO"], q:"Which vitamin is produced when skin is exposed to sunlight?", opts:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"], ans:3, exp:"Vitamin D is synthesized in the skin when exposed to UVB radiation from sunlight.", diff:"easy" },
  { id:33, topic:"Science", sub:"General Studies", group:["G1","G2","G4"], q:"The unit of electric resistance is?", opts:["Ampere","Volt","Ohm","Watt"], ans:2, exp:"Electric resistance is measured in Ohms (Ω), named after Georg Simon Ohm.", diff:"easy" },
  { id:34, topic:"Science", sub:"General Studies", group:["G2","G4","VAO"], q:"DNA stands for?", opts:["Deoxyribonucleic Acid","Dinitrogen Acid","Deoxyribose Nucleotide Acid","Dynamic Nucleic Acid"], ans:0, exp:"DNA = Deoxyribonucleic Acid — carries genetic instructions for all living organisms.", diff:"easy" },
  { id:35, topic:"Science", sub:"General Studies", group:["G1","G2","G2A"], q:"Which gas is most abundant in Earth's atmosphere?", opts:["Oxygen","Carbon Dioxide","Argon","Nitrogen"], ans:3, exp:"Nitrogen (N2) constitutes about 78% of Earth's atmosphere.", diff:"easy" },
  { id:36, topic:"Science", sub:"General Studies", group:["G2","G4","VAO"], q:"The speed of light in vacuum is approximately?", opts:["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], ans:1, exp:"Speed of light ≈ 3×10⁸ m/s (299,792,458 m/s exactly).", diff:"medium" },
  { id:37, topic:"Science", sub:"General Studies", group:["G1","G2"], q:"Penicillin was discovered by?", opts:["Louis Pasteur","Alexander Fleming","Edward Jenner","Robert Koch"], ans:1, exp:"Alexander Fleming discovered Penicillin in 1928 from the mold Penicillium notatum.", diff:"easy" },
  // ENVIRONMENT
  { id:38, topic:"Environment", sub:"General Studies", group:["G1","G2","G4"], q:"Which article of Indian Constitution deals with environment protection?", opts:["Article 48A","Article 51A","Article 21","Both A and B"], ans:3, exp:"Art. 48A (DPSP) — State duty; Art. 51A(g) — Fundamental Duty of citizens to protect environment.", diff:"medium" },
  { id:39, topic:"Environment", sub:"General Studies", group:["G2","G4","VAO"], q:"The Kyoto Protocol is related to?", opts:["Biodiversity","Climate Change","Nuclear Weapons","Marine Pollution"], ans:1, exp:"Kyoto Protocol (1997) is an international treaty on reducing greenhouse gas emissions.", diff:"medium" },
  { id:40, topic:"Environment", sub:"General Studies", group:["G1","G2","G2A"], q:"Which is the largest biosphere reserve in India?", opts:["Nilgiri","Gulf of Mannar","Sundarbans","Nanda Devi"], ans:0, exp:"Nilgiri Biosphere Reserve is the largest in India (5520 sq km), established in 1986.", diff:"hard" },
  // TAMIL HISTORY
  { id:41, topic:"Tamil History", sub:"General Studies", group:["G1","G2","G4","VAO"], q:"சங்க இலக்கியத்தில் மேற்கணக்கு நூல்கள் எத்தனை?", opts:["8","10","18","24"], ans:2, exp:"மேற்கணக்கு: எட்டுத்தொகை (8) + பத்துப்பாட்டு (10) = 18 நூல்கள்.", diff:"medium" },
  { id:42, topic:"Tamil History", sub:"General Studies", group:["G2","G4","VAO"], q:"தமிழகத்தில் முதல் சங்கம் எங்கு நடைபெற்றது?", opts:["மதுரை","கபாடபுரம்","காஞ்சி","பூம்புகார்"], ans:1, exp:"முதல் சங்கம் கடல்கோளில் மூழ்கிய கபாடபுரத்தில் நடைபெற்றதாக ஐதிகம்.", diff:"medium" },
  { id:43, topic:"Tamil History", sub:"General Studies", group:["G1","G2","G4"], q:"திருக்குறளை எழுதியவர் யார்?", opts:["இளங்கோ அடிகள்","திருவள்ளுவர்","கம்பர்","அவ்வையார்"], ans:1, exp:"திருக்குறளை திருவள்ளுவர் இயற்றினார். இது உலகப் பொது மறை எனப்படும்.", diff:"easy" },
  { id:44, topic:"Tamil History", sub:"General Studies", group:["G2","G4","VAO"], q:"சிலப்பதிகாரம் எழுதியவர்?", opts:["சீத்தலைச் சாத்தனார்","இளங்கோ அடிகள்","திருவள்ளுவர்","கம்பர்"], ans:1, exp:"சிலப்பதிகாரம் — இளங்கோ அடிகளால் இயற்றப்பட்ட தமிழ் காப்பியம்.", diff:"easy" },
  // TAMIL GRAMMAR
  { id:45, topic:"Grammar", sub:"Tamil", group:["G2","G4","VAO"], q:"தமிழ் எழுத்துக்கள் மொத்தம் எத்தனை?", opts:["247","216","256","196"], ans:0, exp:"தமிழ் எழுத்துக்கள்: 12 உயிர் + 18 மெய் + 216 உயிர்மெய் + 1 ஆய்தம் = 247.", diff:"easy" },
  { id:46, topic:"Grammar", sub:"Tamil", group:["G2","G4","VAO"], q:"தமிழில் உயிரெழுத்துக்கள் எத்தனை?", opts:["12","13","16","18"], ans:0, exp:"தமிழில் 12 உயிரெழுத்துக்கள்: அ,ஆ,இ,ஈ,உ,ஊ,எ,ஏ,ஐ,ஒ,ஓ,ஔ.", diff:"easy" },
  { id:47, topic:"Grammar", sub:"Tamil", group:["G2","G4","VAO"], q:"'வல்லினம்' எழுத்துக்கள் எத்தனை?", opts:["3","6","9","12"], ans:1, exp:"வல்லின மெய்கள் 6: க்,ச்,ட்,த்,ப்,ற்.", diff:"easy" },
  { id:48, topic:"Grammar", sub:"Tamil", group:["G4","VAO"], q:"இடைச்சொல் எந்த வகையை சேர்ந்தது?", opts:["பொருட்சொல்","இடைச்சொல்","உரிச்சொல்","வினைச்சொல்"], ans:1, exp:"இடைச்சொல் — தனித்து பொருள் தராமல் பிற சொற்களோடு சேர்ந்து பயன்படுவது.", diff:"medium" },
  // MATHS
  { id:49, topic:"Maths", sub:"Aptitude", group:["G2","G4","VAO"], q:"If 15% of a number is 75, what is the number?", opts:["400","450","500","550"], ans:2, exp:"x × 15/100 = 75 → x = 75 × 100/15 = 500.", diff:"easy" },
  { id:50, topic:"Maths", sub:"Aptitude", group:["G2","G4","VAO"], q:"The LCM of 12, 18, and 24 is?", opts:["36","48","72","96"], ans:2, exp:"12=2²×3, 18=2×3², 24=2³×3. LCM = 2³×3² = 72.", diff:"medium" },
  { id:51, topic:"Maths", sub:"Aptitude", group:["G2","G4"], q:"A train travels 360 km in 4 hours. What is its speed?", opts:["80 km/h","85 km/h","90 km/h","95 km/h"], ans:2, exp:"Speed = Distance/Time = 360/4 = 90 km/h.", diff:"easy" },
  { id:52, topic:"Maths", sub:"Aptitude", group:["G4","VAO"], q:"What is 25% of 480?", opts:["100","110","120","130"], ans:2, exp:"25% of 480 = 480 × 25/100 = 120.", diff:"easy" },
  { id:53, topic:"Maths", sub:"Aptitude", group:["G2","G4","VAO"], q:"Simple interest on ₹2000 at 10% p.a. for 3 years?", opts:["₹500","₹600","₹650","₹700"], ans:1, exp:"SI = P×R×T/100 = 2000×10×3/100 = ₹600.", diff:"easy" },
  { id:54, topic:"Maths", sub:"Aptitude", group:["G2","G4"], q:"If a:b = 3:4 and b:c = 5:6, then a:c = ?", opts:["5:8","15:24","5:6","3:6"], ans:1, exp:"a:b:c = 3×5 : 4×5 : 4×6 = 15:20:24. So a:c = 15:24.", diff:"hard" },
  // REASONING
  { id:55, topic:"Reasoning", sub:"Aptitude", group:["G2","G4"], q:"Find the next: 2, 6, 12, 20, 30, ?", opts:["40","42","44","48"], ans:1, exp:"Pattern: n(n+1). Next: 6×7=42.", diff:"medium" },
  { id:56, topic:"Reasoning", sub:"Aptitude", group:["G2","G4","VAO"], q:"If MANGO = 13+1+14+7+15 = 50, then APPLE = ?", opts:["50","51","52","53"], ans:1, exp:"A=1,P=16,P=16,L=12,E=5. Sum=1+16+16+12+5=50. Wait: 50. Actually 50. Ans: 50 → option 0.", ans:0, exp:"A+P+P+L+E = 1+16+16+12+5 = 50.", diff:"medium" },
  { id:57, topic:"Reasoning", sub:"Aptitude", group:["G4","VAO"], q:"Odd one out: Cat, Dog, Lion, Rose", opts:["Cat","Dog","Lion","Rose"], ans:3, exp:"Rose is a flower; others are animals.", diff:"easy" },
  { id:58, topic:"Reasoning", sub:"Aptitude", group:["G2","G4"], q:"If today is Monday, what day will it be after 100 days?", opts:["Tuesday","Wednesday","Thursday","Friday"], ans:1, exp:"100 mod 7 = 2. Monday + 2 = Wednesday.", diff:"medium" },
  // CURRENT AFFAIRS / SCIENCE & TECH
  { id:59, topic:"Science & Tech", sub:"General Studies", group:["G1","G2","G2A"], q:"India's first satellite was named?", opts:["Bhaskara","Aryabhata","Rohini","INSAT-1A"], ans:1, exp:"Aryabhata was India's first satellite, launched on April 19, 1975.", diff:"easy" },
  { id:60, topic:"Science & Tech", sub:"General Studies", group:["G2","G4","VAO"], q:"ISRO headquarters is located in?", opts:["Mumbai","New Delhi","Bengaluru","Chennai"], ans:2, exp:"ISRO (Indian Space Research Organisation) HQ is in Bengaluru (Bangalore).", diff:"easy" },
  { id:61, topic:"Science & Tech", sub:"General Studies", group:["G1","G2","G4"], q:"Chandrayaan-3 successfully landed on Moon in?", opts:["2021","2022","2023","2024"], ans:2, exp:"Chandrayaan-3 successfully soft-landed near Moon's south pole on August 23, 2023.", diff:"easy" },
  // More polity
  { id:62, topic:"Polity", sub:"General Studies", group:["G1","G2","G2A"], q:"The President of India is elected by?", opts:["Lok Sabha only","Rajya Sabha only","Elected members of Parliament and State Legislatures","All citizens"], ans:2, exp:"President is elected by elected members of both Houses of Parliament and State Legislative Assemblies (Electoral College).", diff:"medium" },
  { id:63, topic:"Polity", sub:"General Studies", group:["G2","G4","VAO"], q:"'Right to Privacy' was declared Fundamental Right by which case?", opts:["Kesavananda Bharati","Maneka Gandhi","K.S. Puttaswamy","Vishaka"], ans:2, exp:"K.S. Puttaswamy vs Union of India (2017) — SC declared Right to Privacy as a Fundamental Right.", diff:"hard" },
  { id:64, topic:"Polity", sub:"General Studies", group:["G1","G2"], q:"The concept of judicial review comes from which country?", opts:["UK","USA","France","Australia"], ans:1, exp:"Judicial Review originated in USA through Marbury vs Madison (1803) case.", diff:"medium" },
  // Tamil Nadu specific
  { id:65, topic:"TN History", sub:"General Studies", group:["G1","G2","G4","VAO"], q:"Tamil Nadu was formed as a separate state on?", opts:["Jan 26, 1950","Nov 1, 1956","Jan 14, 1969","Apr 2, 1967"], ans:2, exp:"Tamil Nadu was officially renamed from Madras State to Tamil Nadu on January 14, 1969.", diff:"medium" },
  { id:66, topic:"TN History", sub:"General Studies", group:["G2","G4","VAO"], q:"The capital of Tamil Nadu is?", opts:["Madurai","Coimbatore","Chennai","Salem"], ans:2, exp:"Chennai (formerly Madras) is the capital of Tamil Nadu.", diff:"easy" },
  { id:67, topic:"TN History", sub:"General Studies", group:["G2","G4","VAO"], q:"Periyar's Self-Respect Movement started in which year?", opts:["1920","1925","1928","1930"], ans:1, exp:"E.V. Ramasamy Periyar founded the Self-Respect Movement in 1925.", diff:"medium" },
  { id:68, topic:"TN History", sub:"General Studies", group:["G1","G2","G4"], q:"Who is known as 'Periyar'?", opts:["C.N. Annadurai","M. Karunanidhi","E.V. Ramasamy","K. Kamaraj"], ans:2, exp:"E.V. Ramasamy Naicker is known as 'Periyar' (The Great Man/Wise One).", diff:"easy" }
