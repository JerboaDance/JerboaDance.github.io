const venues = {
  eriksonTheater: {
    name: "Erikson Theater",
    city: "Seattle",
    url: "https://theatres.seattlecentral.edu/erickson-theatre"
  },
  yawTheater: {
    name: "Yaw Theater",
    city: "Seattle",
    url: "http://www.yawtheater.com/"
},
  velocityDanceCenter: {
    name: "Velocity Dance Center",
    city: "Seattle",
    url: "http://velocitydancecenter.org/"
},
  centerHouseTheater: {
    name: "Center House Theater",
    city: "Seattle",
    url: "http://www.seattlecenter.com/locations/detail.aspx?id=62"
  },
  actTheater: {
    name: "ACT Theater",
    city: "Seattle",
    url: "http://www.acttheatre.org/"
  },
  hudsonGuildTheater: {
    name: "Hudson Guild Theater",
    city: "New York",
    url: "http://hudsonguild.org/space-rentals/"
  }
}

const photographers = {
  jesusChapaMalacara: {
    name: "Jesus Chapa-Malacara"
  },
  warrenWoo: {
    name: "Warren Woo",
    url: "http://www.warren-woo.com/"
  }
}

const companyMembers = {
  adamPellegrine: {
    id: "adamPellegrine",
    name: "Adam Pellegrine",
    headshot: {
      filename:"AdamPellegrine.jpg"
    },
    bio: `Adam is very excited to be performing with this amazing group of dancers in Jerboa.  He hails from the University of Alabama where he trained in theater and dance.  Adam has performed across the nation and around the world, most recently coming off the national tour of Urban Cowboy the Musical.  He has also performed throughout the city, including the world premier of Nutcracker: Rated R at the Theater for the New City, as well as the role of Jack in The Naked Dead Elephant… at the Cherry Lane Theater.  Some of  his favorite roles include Bernardo in West Side Story, Anthony Martini in One Flew Over the Cuckoo’s Nest, and Rosencrantz in Shakespearear’s Hamlet.  He would like to extend a special thank you to family and friends for all of their love, guidance, and support and for being there with him every step of the way.
    `
  },
  alexandriaSipe: {
    id: "alexandriaSipe",
    name: "Alexandria Sipe",
    headshot: {
      filename:"AlexandriaSipe.jpg",
      photographer: photographers.warrenWoo
    },
    bio: `Alexandra Sipe found movement at University of Idaho, where she quickly got wrapped up in ballet, contemporary dance, and yoga. She spent her college career touring with Dancers, Drummers, Dreamers and traveling to train at American Dance Festival. Sipe is currently a freelance dance artist and has performed for Bridge Project, Converge, and Seattle International Dance Festival as well as in shows in New York City, Portland, and Washington DC.
    <p>
    Alexandra teaches bungee fitness and yoga. While not dancing or upside down, Sipe enjoys writing spy novels and hanging out with her cat, Dude.
    `
  },
  alexUng:{
    id: "alexUng",
    name: "Alex Ung",
    headshot: {
      filename:"AlexUng.jpg"
    },
    bio: `In his second year with JERBOA Dance, Alex Ung is giddy to be in his first burlesque show. A hip hop dancer turned contemporary/modern, Alex started his career in college as a hip hop teacher/choreographer. Now his styles vary from crew-style hip hop to contemporary jazz to Broadway and Musical Theatre, and even contemporary ballet. He’s taught at Pacific Northwest Ballet School, Seattle Children’s Theatre, Bainbridge Ballet, Northwest School of Dance, and Momentum Dance. He’s made award-winning choreography for Bainbridge Ballet Competition Dance Team and also choreographed for Olympic Performance Group. On stage, Alex has performed with Peaches Christ Productions, Seattle Musical Theatre, Bainbridge Performing Arts, Olympic Ballet Theatre, Olympic Performance Group, Seattle PRIDE Mainstage, and Pacific MusicWorks, among other dance and theater companies. He spends his free time rock climbing, biking, and backpacking (as mountains and ocean are not native to this Iowan), while also finding time to teach and substitute at PNB School and Seattle Children’s Theatre, and creating with his amazing JERBOA Dance comrades.
    `
  },
  andreasFetz:{
    id: "andreasFetz",
    name: "Andreas Fetz"
  },
  andresLopez: {
    id:"andresLopez",
    name: "Andr&eacute;s Lopez",
    headshot: {
      filename:"AndresLopez.jpg"
    },
    bio:`Andr&eacute;s Lopez was born and raised in Medellin, Colombia. He graduated from the University of Antioquia, where eventually he became a teacher.
    He has spent a summer in Cuba studying Video Dance with Silvina Szperling, and a year in Brazil taking studied in fashion photography. He’s been part of dance collectives in Medellin allowing him to travel with contemporary dance companies. Andr&eacute;s is very excited to be making his Seattle dance debut 
    `
  },
  angelaSchmidt: {
    id: "angelaSchmidt",
    name: "Angela Schmidt",
    headshot: {
      filename:"AngelaSchmidt.jpg"
    },
    bio: `Angela Schmidt began her ballet studies at the age of 13 at the Michigan Classical Ballet Company and later at the Metropolitan Ballet Academy. She participated in four seasons of Regional Dance America and attended summer intensives at the Boston Ballet, Kirov Academy in Washington D.C., Burklyn Ballet Theatre, and Ballet Austin. She also received scholarships to Houston Ballet, Ballet West, and ABT Detroit. 
    <p>
    Angela took a break from ballet to attend the University of Michigan. Upon moving to New York, she rekindled her love for dance and performed with the Albano Ballet Company, Jersey City Ballet, and appeared in Valentina Kozlova's International Ballet Competition. Upon moving to Seattle she has performed with Concord dance collective, Julie Tobiasson's Ballet Bird, and Dance Conservatory Seattle. She is thrilled to be performing with Jerboa and contributing to the Seattle dance scene.     
    `
  },
  anjaKellnerRogers:{
    id: "anjaKellnerRogers",
    name: "Anja Kellner-Rogers",
    bio: `Anja Kellner-Rogers is a dance artist and yoga teacher based in Seattle, WA. Anja grew up in upstate New York, where she began dancing at the age of 4. Throughout her adolescence she trained with various establishments including Broadway Dance Center, Steps on Broadway, NYU Tisch School of the Arts and Giordano Jazz Dance Chicago. Anja attended SUNY Brockport as a dance major where she had the privilege of studying and performing under the direction of artists Bill Evans, David Dorfman, Suzanne Oliver and Juanita Suarez. She went on to graduate summa cum laude from Ithaca College with degrees in Exercise Science and Dance. 
    <p>
    Since re-locating to Seattle in 2013, Anja has worked with various choreographers including KT Niehoff, Shannon Stewart, Alyza DelPan-Monley, Noelle Chun, Alice Gosti, Kimberly Holloway and Tim Johnson. She has been collaborating and performing with Karin Stevens Dance since 2015 and she has collaborated with Dark Set Films under the direction of Emily Durand and Brett Love. 
    <p>
    When Anja isn’t dancing, she spends most of her time teaching yoga and leading teacher trainings at The Grinning Yogi, as well as showering her one eyed dog with endless love and affection. 
    `
  },
  bridgetGunning: {
    id: "bridgetGunning",
    name: "Bridget Gunning",
    headshot: {
      filename:"BridgetGunning.jpg"
    },
    bio: `Bridget Gunning is an artist, mover, improviser, aerialist and and practitioner based out of Seattle, WA. Bridget brings over 15 years of professional experience as a solo and group performer . Her interest lies in the intersection of circus arts, dance, theater and somatic movement techniques. Hailing from Tucson, AZ, Bridget spent her youth in the pool as a competitive swimmer. She held the Arizona State Record for the 25-yard backstroke when she was 8-years-old. Outside of the pool, she always sang songs and danced dances to entertain family and friends. She decided to get out of the pool and onto the stage where she could use her body to express and create art. She began her formal ballet training at the age of 16. She made up for lost time in the dance world with classical training at The Academy of Ballet in Tucson, AZ. She danced in many ballets and theater productions and was active in her artistic and academic communities as a performer and choreographer. This creative and physical practice translated well into the circus arts. She began her aerial studies in 2001 under the instruction of Nanette Robinson and Nathan Dryden of ZUZI! Dance Company. Here she began her love with aerial through the low flying trapeze and Skinner Releasing Technique. Bridget came to Seattle in 2006 to seek more Skinner Releasing training as well as to connect with other artists and make a career as a performer. She worked as a free lance dancer with choreographers across the Northwest including Manifold Motion, Dancing People Company, Acorn Dance, Lingo Dance Company, Dayna Hanson and The Asterisk Project to name a few. She is showcased weekly at The Pink Door, where she is the resident Trapeze Artist. Her work includes Seattle’s Original Girl Gang: The Aerialistas, Lo-Fi Arts Festival, Seattle Erotic Arts Festival, Emerald City Trapeze Arts, ticktock dance, On The Boards’ 12-Minutes Max, COCA, Aloft Aerial Arts, Animate Objects Physical Theater, Stimulate Dance and Madame Rex Entertainment. Bridget is a Certified Yoga Teacher and Personal Trainer. She holds a BA from the University of Arizona where she studied dance, sociology and psychology. Bridget is in her second year of teacher training in Open Source Forms with Stephanie Skura. Bridget runs her own studio and performance company Apex Aerial Arts in Seattle. She is really, really, super excited to premier as a performer with Jerboa Dance!
    `
  },
  chelseaReinschmidt: {
    id: "chelseaReinschmidt",
    name: "Chelsea Reinschmidt",
    headshot: {
      filename:"ChelseaReinschmidt.jpg",
      photographer: photographers.warrenWoo
    },
    bio: `Chelsea took their first ballet class at the age of 3 but didn’t like the pink shoes or the standing still thing. However, their love of movement started young and they spent the bulk of their youth competing in the Texas junior olympic women’s  gymnastics program. In their 20s, they discovered AcroYoga and partner acrobatics and briefly toured with a local circus troupe in Chicago. In 2012, they began modern dance as well as tap, jazz, ballet and hip hop at eXit Space school of dance where they currently dance. They are excited to perform with Jerboa where they get a chance to combine their love of both dance and acrobatics. 
    `
  },
  christinaJohnson: {
    id: "christinaJohnson",
    name: "Christina Johnson",
    headshot: {
      filename:"ChristinaJohnson.jpg"
    },
    bio: `Christina Johnson fell in love with dance back in the 1990s.  She was dancing in Portland, OR with BodyVox, Bent, and Kinetic Images dance companies and entertaining the idea of being a “dancer”.  She moved to Seattle where she co-founded Jerboa Dance, and has dedicated her professional life to the arts ever since.  Her time in Seattle was spent learning and performing with many prominent companies and choreographers, including: Cheronne Wong, BetterBiscuit, XODO, Alethea Adsitt, Fusion, and Seattle Jazz. After finding success in Seattle and to continue her growth as an artist, she moved across the country. Having joined the New York dance scene in 2005, Christina is proud to have been on stage with The Love Show, Shir Dance Theater, Eva Dean Dance, Anahid Sofian Dance Company, Gilgamesh Theater, Witches in Bikinis, & independentdancemaker/Kara Tatelbaum.
    `
  },
  christopherEMontoya: {
    id: "christopherEMontoya",
    name: "Christopher E. Montoya",
    headshot: {
      filename:"ChristopherEMontoya.jpg"
    },
    bio: `Christopher E. Montoya was born in the small town of St. Johns, Arizona but grew up in South Phoenix. Mr. Montoya began his academic journey with the University of Arizona, taking time off periodically to work with professional dance companies. He started his professional career with Gus Giordano Jazz Dance Chicago as a second company member. He continued his career with David Taylor Dance Theatre, Scorpius Dance Theatre, and Center Dance Ensemble, guesting periodically with Queen City Ballet and Legacy Dance Theater. He also enjoyed dancing on pointe with Les Ballets Trockadero de Monte Carlo, performing as Doris Vidanya around the world, including Japan, Israel, France, Austria, Brazil, Chile, Finland, Spain, and Italy. 
    <p>
    Moving to Seattle in 2011, Mr. Montoya completed his undergraduate degree with Cornish College of the Arts, while also performing with Seattle Dance Project and Men In Dance. While at Cornish, his goals shifted from professional work to teaching dance in higher education, which led him to receive his Master of Fine Arts from the University of Washington. He chose the University of Washington dance department because its curriculum and faculty is one of the best in the country, and he knew the program would prepare him for teaching at the collegiate level while assisting him to understand the importance of dance education. A highlight while attending the University of Washington was working with Chamber Dance Company performing works: To Have and To Hold and Moonlight by Shapiro and Smith, Petrousckha’s Room by Michel Fokine, Cloudless by Susan Marshall, and Center of My Heart by Douglas Elkins. Mr. Montoya is most proud of the class that he developed on the Romantic era of ballet with the assistance of Professor Hannah Wiley.
    <p>
    After graduate school, Mr. Montoya began working with Spectrum Dance Theater as the Ballet Division Head, which then turned into the School Director. For the last few years he has been teaching open class for Dance Fremont, and was recently enjoying his role as the Managing Director of Dance Fremont. He would like to further develop his studies of ballet history and looks forward to teaching future generations of dancers at <a href="https://www.danceconservatoryseattle.com/">DANCE CONSERVATORY Seattle</a>.
    `
  },
  constanzeVillines:{
    id: "constanzeVillines",
    name: "Constanze Villines",
    headshot: {
      filename:"ConstanzeVillines.jpg"
    },
    bio: `Constanze Villines trained at SVN, Tanzprojekt, as well as the Munich Opera dance academy (Bosl Stiftung) until age eleven. She then expanded her dance training to tap, jazz, and contemporary/modern in Los Angeles, Texas, and Seattle. Constnaze has also trained in gymnastics, rhythmical gymnastics, and contact improvisation. She has danced for Brigitta Toma, Tanztheater Salome, Marlo Ariz, Sapience Dance Collective (Sara Sader & Amy Weaver), Cyrus Khambatta, Maya Soto, Alicia Mullikin, and 3 rd Shift Dance (Xaviera Vandermay), amongst others. She has had the pleasure of performing at The Munich Opera, Tanztheater Salome, Tollwood Festival, Dance Experiment Los Angeles, VE’s Standing in the Storm, Body Politics, Converge Dance Festival, The Seattle Intl. Dance Festival, and more. 
    <p>
    As a choreographer, Constanze’s work has been shown in Germany as part of the Tollwood Festival and throughout the country. Since moving to Seattle in 2009, she has worked and collaborated with different Seattle artists and since 2013 produces, together with Cyrus Khambatta, The Seattle International Dance Festival. She is the managing director of Khambatta Dance Company and since 2014 the artistic director of reflexion Dance Company. Constanze’s choreographic works have been shown throughout Seattle at Velocity Dance Center, Body Politics Festival Tacoma, The Seattle International Dance Festival, The Pocket Theater, Out on a Limb Dance Festival in Olympia, and more. Her work has been commissioned for the 2016 The Glossary at The Neptune Theater and the 2016 LitCrawl.
    `
  },
  davidLorenceSchleiffers: {
    id: "davidLorenceSchleiffers",
    name: "David Lorence Schleiffers",
    headshot: {
      filename:"DavidLorenceSchleiffers.jpg"
    },
    bio: `David stumbled upon a career in dance after being cast as a chorus boy in the musical 42nd Street in 2005. Since then, he has studied with 5th Avenue Theatre, Dance This…, Bill Evans, Hannah C. Wiley and Catherine Cabeen. He was recently a part of the Young Choreographers Lab with Amy O’Neil, a six-week workshop sponsored by the Seattle Theatre Group where he trained with choreographers such as Anne Green Gilbert, Donald Bryd, and Mark Haim. Currently, he is  working towards a BA in Dance at the University of Washington.  His work, Watermark, Part 1, will be showcased at the American College Dance Festival, which will be held in Utah this March. Locally, he has danced with Redd Legg Dance Company and Chamber Dance Company.
    `
  },
  elizabethBurwell: {
    id: "elizabethBurwell",
    name: "Elizabeth Burwell",
    headshot: {
      filename:"ElizabethBurwell.jpg"
    },
    bio: `After graduating from Birmingham-Southern College with a degree in French and dance, Elizabeth moved to New York to pursue a career in dance. She’s danced with such notables as Saba Dance Theater, Kenny Larson and Beth Soll. She also appeared in Lois Greenfield’s Breaking Bounds calendar. Elizabeth and her husband, Clay, own High Performance NYC, a private personal training facility in New York. There, she works as a personal trainer fusing her dance training with various other techniques such as Pilates and Kettlebells to help her clients get fit. She feels very lucky to have two careers that she loves. Speaking of love, she recently got a Doberman puppy named Zulu.
    `
  },
  ericVlach: {
    id: "ericVlach",
    name: "Eric Vlach",
    headshot: {
      filename:"EricVlach.jpg"
    },
    bio: `Eric Vlach, originally from Portland, Oregon, graduated from NYU’s Tisch School of the Arts in 2005 with a B.F.A. in dance. As a freelance dancer and digital designer, he manages to satisfy both his artistic and techno-geek appetites. This season, in addition to Jerboa Dance, Eric is working with Lydia Johnson Dance and Eglevsky Ballet.
    `
  },
  finnCronin: {
    id: "finnCronin",
    name: "Finn Cronin",
    headshot: {
      filename:"FinnCronin.jpg"
    },
    bio: `Ms. Cronin received her formal training at L’Academie de Danse Classique Princesse Grace in Monte Carlo, Blue Lake Fine Arts, and Ballet Iowa. In 1996 she attended Idyllwild Arts Academy in California, where she found her focus in modern dance. In 1998, she returned to Germany to travel and gather inspiration while working toward her degree in European studies. She has danced for Tanzforum Aki Kato, Complete in Motion, and was a guest artist for a season at the Mannheim Nationaltheater in Germany. Since moving to Seattle in 2005, she has danced with The Seattle Opera, Bumbershoot, and was chosen as one of Seattle’s up and coming choreographers for NEXT fest NW. Ms.Cronin has also choreographed for Social Living Productions and is one of the founding members of Splinter Dance Company.
    `
  },
  gabeMaddox:{
    id: "gabeMaddox",
    name: "Gabe Maddox",
    headshot: {
      filename:"GabeMaddox.jpg"
    },
    bio: `Gabe is excited to be dancing again after spending the last 3 years making two tiny humans from scratch.
    <p>
    She studied in Northern Utah with Sandra Emile of Cache Valley Civic Ballet. In college, studying Modern Dance at Weber State University and then  made her way to the University of Utah, department of Modern Dance.
    <p>
    Gabe has been teaching dance to kids and adults in private studios for the past ten years. Her greatest purpose is to kindle a respect and passion for art, performance, and self love through the journey of kinesthetic awareness.
    `
  },
  hannaLeeSakakibara: {
    id: "hannaLeeSakakibara",
    name: "Hanna-Lee Sakakibara",
    headshot: {
      filename:"HannaLeeSakakibara.jpg"
    },
    bio: `Hanna-Lee was born and raised in Jerusalem, Israel, to a Japanese father and Australian Mother. She began dancing at the age of 4. Graduating from high school she decided to pursue her dance career and moved to NY to study at the Alvin Ailey Dance School. She is currently represented by MSA dancers and choreographers agency, and recently received her artist visa to continue and dance in the U.S.
    `
  },
  jacquelynCorcoran: {
    id: "jacquelynCorcoran",
    name: "Jacquelyn S. Corcoran",
    headshot: {
      filename:"JacquelynCorcoran.jpg"
    },
    bio: `Jacquelyn S. Corcoran Is Co-founder of Underscore Dance Lab, an experimental dance performance company she created with her partner Shakira Rae Adams, currently based out of Seattle WA. She most recently relocated from Ohio where for the past few years she has performed as a solo artist in many showcases and with multiple choreographers in the Ohio/Kentucky area. She has taught contemporary and modern dance at Contemporary Dance Theater for the past eight years as well as performed in and co produced their showcase series Performance and Time Arts. She was also a multi scholarship recipient at both American Dance Festival and Bates Dance Festival. Jacquelyn was a founding member of MamLuft&Co. Dance in Cincinnati Ohio from 2007-2011, the city’s premier modern dance company. She holds a Bachelor of Arts in Dance from Texas Woman’s University and has had the honor of studying with prolific artists, such as Jesse Zarrit, Kathleen Hermesdorf, David Dorfman, and Larry Keigwin to name a few, in her lifetime. She is forever humbled by her experiences and the many great artists she can say helped inform her dancing body thus far.
    <p>
    <p>
    “To understand what I am saying, you have to believe that dance is something other than technique. We forget where the movements come from. They are born from life.”
    <p>
    ― Pina Bausch
    `
  },
  jaimeWaliczek: {
    id: "jaimeWaliczek",
    name: "Jaime Waliczek",
    role: "Artistic Director",
    headshot: {
      filename:"JaimeWaliczek.jpg",
      photographer: photographers.warrenWoo
    },
    bio: `Jaime Waliczek is a choreographer, dancer, and acrobat from Chicago. After moving to Seattle as an adult, she began choreographing for the Eastside Moving Company while performing works by Deborah Wolf, Wade Madsen, among others. Founding Jerboa Dance in 2003, Jaime has continued as artistic director and choreographer. Along with Jerboa, Jaime has performed with many local companies including DASS Dance and the Seattle Opera. While producing Back from the Brink for Jerboa Dance in NYC, she also danced with Angela Harriell’s company, The Love Show. In addition to her work with Jerboa Dance, Jaime’s choreography has been presented at festivals including the DUMBO festival, the Cool NY festival, DNA Works in Progress, the Guild dance company, Around the World in 80 Sips, and Trip and Fall. Her background in competitive gymnastics and as a yoga instructor inform her movement and choreography. Jaime’s favorite things are her 2 adorable children and moving with the wonderful artists in Seattle.
    `
  },
  jenniferElder:{
    id: "jenniferElder",
    name: "Jennifer Elder",
    headshot: {
      filename:"JenniferElder.jpg"
    },
    bio: `Jennifer Elder discovered her love of dance at the age of 12 after gymnastics, baton twirling, tennis, horseback riding, track and field and swimming didn’t quite work out. A native of the Pacific Northwest, Jen received her dance training at the Southwest Washington Dance Center in Ballet and Modern where she was a member of the Southwest Washington Ballet Ensemble and Blacken Tan Dance. She later went on to earn her BFA in Modern Dance graduating Cum Laude from the University of Utah. While attending the U of U, she danced for the department’s Performing Dance Company, performing original works by Abby Fiat, Eric Handman, and Brent Schneider. Since moving to Seattle in 2008, Jen has made her own work, which has appeared in the BOOST Dance Festival, Northwest Dance Festival, and TAKE pause. Jen has had the honor to dance for local Seattle artists and companies such as Marlo Martin, Michele Miller/Catapult, Khambatta Dance Company, DASSdance, Whibey Island Dance Theater, Jerboa Dance Company, Redd Legg Dance, and Northwest Dance Syndrome. Currently, Jen is proud to be a continuing member of Badmarmar Dance under the direction of Marlo Martin.
    `
    },
  julieSmith: {
    id: "julieSmith",
    name: "Julie Smith",
    headshot: {
      filename:"JulieSmith.jpg"
    },
    bio: `Julie is so excited to be performing with Jerboa Dance! She holds a BFA in acting and trained at the Martha Graham School of dance. Julie danced with her Graham teacher’s modern company, Coyote Dancers, for two NYC seasons and soon landed her first Off Broadway show. She went on to perform in many regional theatres, for Disney, and went on the road with national tours of Gigi and CanCan. Her favorite roles include; “Val”, in the European tour of A Chorus Line, and most recently, the 1st cover for the leading lady, “Stephanie”, in the Broadway tour of Saturday Night Fever. Julie now is also pursuing acting in Film and TV! She has a small recurring part on One Life to Live, and played her first supporting role in an indie feature film last year.
    `
  },
  karenGrady:{
    id: "karenGrady",
    name: "Karen Grady",
    headshot: {
      filename:"KarenGrady.jpg"
    },
    bio: `Karen Grady is a lover of life, a dancer, a performer, a choreographer, a fitness instructor, a dance educator, and a mother. She teaches contemporary dance technique, ballet, modern, yoga, creative movement, GYROTONIC® and choreography to students of all ages. Originally from Colorado, Karen moved to Seattle in 2002 to expand her experiences as a performing artist and to study at Cornish College of the Arts. Karen graduated from Cornish in 2006 with a B.F.A. in dance and received an outstanding artist award at graduation. Karen started dancing with Jerboa Dance in 2002, she enjoys the work of Jamie Waliczek because of its dynamic variety and creativity! She now spends most of her days at her Gyrotonic studio in Bellevue Washington.
    `
  },
  kristenKissel: {
    name: "Kristen Kissel"
  },
  lauranDrackett:{
    id: "lauranDrackett",
    name: "Lauran Drackett",
    headshot: {
      filename:"LauranDrackett.jpg",
      photographer: photographers.warrenWoo
    },
    bio: `Lauran is a dancer and aerialist based in Seattle, WA. A graduate of Northwestern University’s Dance program, Lauran has trained with Aerial Dance Chicago (ADC), Actors Gymnasium, Diavolo Dance Theatre and the Paul Taylor Dance Company. From 2009 – 2011 Lauran was a dancer, choreographer, and assistant teacher with ADC and served on the board in 2016. From 2011 – 2015 Lauran performed with Innervation Dance Cooperative, J Lindsay Brown, among others in the Chicago area. Since 2016, she has worked with The Cabiri, a company that uses dance, aerial arts, and theatrical performance to bring the mythologies of extinct and endangered cultures to the community. 
    `
  }, 
  laurenSlater:{
    id:"laurenSlater",
    name: "Lauren Slater",
    headshot: {
      filename:"LaurenSlater.jpg"
    },
    bio: `Lauren Christina Slater grew up and trained in sunny Encinitas, CA., studying dance and theater with Janice Lee, Carol Mead, Jean Isaacs, Faith Jensen-Ismay, Tom Hansen, Currie Peterson, and Sue Gilson. Beginning at age 10, she attended pre-professional training programs on scholarship at The Kirov Academy, BalletMet and Pennsylvania Ballet’s Rock School, where she was also a trainee. 
    <p>
    Obsessed with movie musicals of the 1930s-1960s, Lauren loved the expression and glamour of a performers life. The lure of LA led her to work as a professional Rave dancer, sponsored by JNCO Jeans, for almost two years. This opened up her mind of what a dance career could look like, exposing her to the worlds of break/club dance, drag and burlesque. Concurrently, Lauren graduated magna cum laude with a degree in Dance and Kinesiology from UCSB.
    <p>
    Upon graduating, she moved to Europe, where she performed works of William Forsythe with members of the Frankfort Ballet, as well as working with post-modern artist Anne Therese de Keersmaeker. Settling next in San Francisco, Lauren became a founding member of the contemporary company LEVYdance, and has also danced for Larry Kegwin, Monica Bill Barnes, Christopher Pilafian, San Diego Dance Theater, Mojalet Dance Collective, Abigail Munn, Capacitor (Jodi Lomask), and Monique Jenkinson (Fauxnique). 
    <p>
    She moved to Seattle with her husband, musician Doug Major,  in September 2017, where she’s found an artistic home working with Lily Verlaine (House of Verlaine, Verlaine and McCann Productions The Land of the Sweets) and Jerboa Dance. This is her first season with Jerboa Dance and is honored to be working with these great artists! 
    <p>
    Lauren is also a professional health coach, yoga teacher and Classical Pilates instructor. She founded HIVE Wellness Consultancy in 2018, with the mission of sharing her knowledge of the body, mind and soul.
    `
  },
  meganCourtney: {
    id:"meganCourtney",
    name:"Megan Courtney"
  },
  meghanShepard:{
    id: "meghanShepard",
    name: "Meghan Shepard",
    headshot: {
      filename:"MeghanShepard.jpg"
    },
    bio: `Even though Meghan Shepard took her first dance class at age 3, she really began her career at 16.  Spending 3 years in LA, she expanded her training and experience by working with multiple choreographers. Returning to Portland, Meghan performed locally and went on her first tour with  Extreme Dance Co. Meghan then moved to Seattle to further pursue dance. In 2007, she graduated Magna Cum Laude from Cornish College of the Arts where she performed with many prominent choreographers. Meghan continues to dance in Seattle, and has been dancing with Jerboa Dance since 2008. She is thrilled to be dancing again in the company’s new season.
    `
    }, 
  morganHoughton: {
    id: "morganHoughton",
    name: "Morgan Houghton",
    headshot: {
      filename:"MorganHoughton.jpg"
    },
    bio:`Born in Seattle WA Morgan began dancing during High School. First taking Jazz at a local studio he began thoroughly enjoying himself. Martial arts, sports and stunt work with friends propelled him to continue dancing in college where he eventually came to realize that he truly had a passion for dance. As one who has always loved movement in so many various forms, Morgan continues to dance and pounce on any opportunities to do more stunt work, photo shoots and anything that inspires movement, drives the soul and allows Morgan to play. He would like to thank his parents for their unending support throughout his life and their encouragement with whatever drove him at the time. He would also like to thank all the dance instructors over the years that continued to inspire and challenge him. Without these people and many more Morgan would not be where he is today.
    `
  },
  noaSagie: {
    id: "noaSagie",
    name: "Noa Sagie",
    headshot: {
      filename:"NoaSagie.jpg"
    },
    bio:`Noa Sagie was born and raised in Kfar Bialik, Israel. She graduated from the “Reut” school of the arts and trained with the “Haia Tzur School For Contemporary Dance” until the age of 18. After completion of her studies she was recruited to the IDF, Israeli Defense Force, where she proudly served for over two years in the Intelligence Force. At the age of 21, she moved to NYC after being accepted to the Alvin Ailey Dance School. While still in school, she received the LCU Foundation scholarship. After finishing her studies with honors and receiving her work permit, she currently resides in New York choreographing and dancing in different projects. Her recent works were presented at the Citigroup Theater at the Joan Weill Center for Dance in 2006 and 2007.
    `
    },
  pamelaTurpin: {
    id: "pamelaTurpin",
    name: "Pamela Turpin",
    headshot: {
      filename:"PamelaTurpin.jpg"
    },
  },
  pamVlach: {
    id: "pamVlach",
    name: "Pam Vlach",
    headshot: {
      filename:"PamVlach.jpg"
    },
    bio:`Pam Vlach moved to Seattle in 2002 to attend the UW and received her BA in Communication in 2006.  She has spent time in New York studying lyrical and jazz under the direction of Suzi Taylor and Joe Lanteri at Steps on Broadway. Additionally, she studied tap under the direction of Roxane Butterfly in the summer of 2005 and performed choreography by Sonia Dawkins and Savion Glover in Dance this…! at the Seattle Paramount Theatre. Recent credits include Excerpts From the Soul of a Woman (2008), Black Nativity at Seattle’s Intiman Theatre (2007), Macy’s Thanksgiving Day Parade (2007), Masters of Lindy Hop and Tap at the Century Ballroom (2007), Young Scrooge in A Tap Dance Christmas Carol (2005), and En L’Air (2005, 2006, 2008). Pam was a founding member of the Solesound Tap Company.  Recent choreography credits include a music video for Nordstrom showcasing their spring line in March of 2007.
    `
  },
  rachelKoshiol: {
    id: "rachelKoshiol",
    name: "Rachel Koshiol",
    headshot: {
      filename:"RachelKoshiol.jpg"
    },
    bio: `Rachel Koshiol started dance classes at the age of 4 and has been moving ever since. While growing up in Minnesota, Rachel danced competitively at Hopkins Dance Center while spending her summers training at MDT and Ballet Arts. During the summer of 2004, Rachel attended American Ballet Theatre’s summer intensive program in Detroit, MI. During college, she paused her dance career to focus on studies but felt called to return immediately after graduation. For two seasons, she competed at an adult level, and during the winter of 2014, she preformed with the Minnesota Dance Collaborative for their opening season of “HoliDaydream”. Since moving to Seattle, Rachel has worked with choreographers including Alicia Mullikin, Marlo Ariz, Maya Soto and Maxie Jamal. She continues to preform in a diverse mix productions, most recently for USC Event’s “Paradiso Festival”. Rachel craves unique styles that blur lines of standard genres and push her physical and mental boundaries. She is excited to continue her exploration with Jerboa Dance.
    `
  },
  renadoTozer:{
    id: "renadoTozer",
    name: "Renado Tozer",
    headshot: {
      filename:"RenadoTozer.jpg"
    },
    bio: `Renado Tozer is thrilled for his fourth season with Jerboa Dance Company. He has been involved with dance and movement theatre for over 15 years. Although never a competitive dancer, he was a national competitive gymnast for near 12 years (coach for 5 years), and has been trained in ballet, jazz, modern and lyrical at Pam’s School of Dance in Toledo, Ia., at the University of the Arts summer camp in Philadelphia, Pa., The Edge in LA, and Webster Conservatory/University in St. Louis, Mo.(where he attended college for musical theatre). Professionally, he has been involved in a very diverse variety of productions including; BumperShoot with Movement Theatre in Seattle, Wa., Miss Continental in Chicago, Ill., Webster University Dance BFA, and after a short hiatus due to injuries, he bounced back in to joining Diversity Dance Company, turned Splinter Dance Company. Currently he is working with Issaquah Dance Theatre as a hip hop teacher, New Vision Dance Company out of Issaquah and One Degree/Flash Mob out of Seattle.
    `
  },
  sarahChampion:{
    id: "sarahChampion",
    name: "Sarah Champion",
    headshot: {
      filename:"SarahChampion.jpg"
    },
    bio: `Sarah Champion has been a performer her entire life. She is classically trained in ballet, jazz, modern, hip hop, lyrical and is an internationally award winning ballroom and latin performer. Sarah is the co-founder and former artistic director of After Midnight Cabaret and has performed with various local dance and performance based companies for many years. Sarah is excited to be on stage again with Jerboa Dance.
    `
  },
  seanCalavan: {
    id: "seanCalavan",
    name: "Sean Calavan",
    headshot: {
      filename:"SeanCalavan.jpg"
    },
    bio:`Sean grew up and trained at local studios in Riverside County, California under the teachings of Julie A. Rhoton, Keri LeGrand, Adam Parson and Cory Finn among others.  In 1999, he received the Dance With the Force award from the LADF convention/competition and spent the summer training at EDGE Performing Arts Center in Hollywood, CA.  After graduating high school, he spent 9 years performing on ships for Holland America Line in shows created by John Charron, Patti Colombo and Tommy Tune getting the opportunity to work directly with each of them.  Sean has also performed in musicals for The Lawrence Welk Resort and The Village Theatre as well as danced for JADD Co. in Los Angeles, CA.  Since moving to Seattle in late 2009, Sean has had the pleasure of performing with Jerboa Dance including at Seattle Fringe Festival and Bumbershoot.  Sean thanks his husband, family and friends for their continued support.
    `
  },
  shakiraRaeAdams: {
    id: "shakiraRaeAdams",
    name: "Shakira Rae Adams",
    headshot: {
      filename:"ShakiraRaeAdams.jpg"
    },
    bio: `Shakira Rae Adams is the Co-Founder of Underscore Dance Lab in partnership with Jacquelyn Corcoran. Shakira’s training resides from Ghana, West Africa where she studied with Bernard Woma. Her dance journey began at Bowling Green State University studying under Dr. Halifu Osumare, Tammy Starr and Deborah Tell, while pursuing her Bachelor in Music Education specializing in classical trumpet performance. Shakira loved to move and found such passion in allowing her soul to speak to the world when her words could not. “Dance kept me sane through my education. Dance gave me breathe and brought me to life when the end was far from sight.” Shakira couldn’t learn enough about movement, so she pursued a Master’s of Education in Sports Medicine with an emphasis on kinesiology. As she pursued a MD she found herself with less time to do what she really wanted to do. Directions shifted and she earned her Bachelor of Science in Nursing at the University of Cincinnati’s accelerated nursing program. A year ago she uprooted and moved to Seattle to continue to dive into the arts with her lovely partner. Together they began Underscore Dance Lab to have an outlet to create, explore and share their views on dance. Shakira wears many hats in life to keep her mind active and ever expanding. 
    <p>
    “I am not bored, ever! Arts have given me a way to express my inner most thoughts and feelings, an outlet to deal with the stress and a way to tell a story. No matter where times go, the arts live within me and I will continue to make a difference.”
`
  },
  shannonAdams: {
    id: "shannonAdams",
    name: "Shannon Adams",
    headshot: {
      filename:"ShannonAdams.jpg"
    },
    bio: `Shannon comes from Salt Lake City, Utah.  She is a lover of all forms of dance and has been trained in Korean folk dance, jazz, ballet, tap, and modern.  She has also studied at the EDGE Dance studio, Performing Dance Center, Broadway Dance Center, Steps on Broadway, Dancespace/Dance New Amsterdam, Joffrey Ballet School, Parson’s Dance Company Summer Program, and American Dance Festival.  Training at The School at Jacob’s Pillow Jazz Program brought the opportunity to work with such legends as Chet Walker, Patti Wilcox, Luigi, and Matt Mattox.  Mrs. Adams graduated Cum Laude in 2004 from the University of Utah with a BFA in Modern Dance. She was the recipient of two Elizabeth R. Hayes scholarships, as well as the Kennecott Scholars scholarship.  At the University of Utah, she had the fortunate opportunity to study with Abby Fiat, Donna White, Steve Koester, Brent Schneider, Tandy Beal, Jon Scoville, Kaye Richards, Pamela Geber, and Eric Handman.  Shannon was also a guest performer with Utah Ballet, and she performed in Performing Dance Company working with such choreographers as Ronald K. Brown, Doug Elkins, and David Dorfman.  
    <p>
    Shannon has a great love and passion for teaching. She has taught and choreographed for various studios and high-schools in Utah, Texas and in the Seattle area.  Outside of Shannon’s voracious appetite for all things dance, she is seen chasing her three kids, spending time with family, eating good food, people watching, and going to live music concerts.  
    `
  },
  stellaKutz:{
    id: "stellaKutz",
    name: "Stella Kutz",
    headshot: {
      filename:"StellaKutz.jpg"
    },
    bio: `Stella was born and raised in South Seattle and studied at Spectrum Dance Theater  under Dale A. Merrill.  Stella received her Bachelor of Fine Arts in Performance Choreography from the University of Nevada, Las Vegas.  She has performed internationally at the Edinburgh and Montreal Fringe Festivals.  
    <p>
    Upon graduation, Stella furthered her training with a Pilates Certification.  She has since completed a teacher training study program in yoga under Richard Freeman in Boulder, Colorado.  
    <p>    
    Stella has performed with notable artists, such as:  Relay Dance Collective, Pat Graney, Gail Gilbert,  Kristina Dillard, Paula Peters, Rhonda Cinotto, Dance Contemporary, Jerboa Dance, and many more.
    <p>    
    Currently, Stella is pursuing her passion for performance by creating an interactive performance and rehearsal space for like minded artists and communities.
    `
  },
  thomasPhelan: {
    id: "thomasPhelan",
    name: "Thomas Phelan",
    headshot: {
      filename:"ThomasPhelan.jpg"
    },
    bio: `Thomas Phelan grew up in Fort Collins, CO. It was there at Colorado State University he earned his BFA in performing arts. After graduation Thomas danced and taught at Alaska Dance Theatre before moving to Seattle where he currently lives and works. His Seattle performance credits include Whim W’him, Coriolis Dance, House of Verlaine, The Cabiri, Alana O Rogers, The Robbie Turner Revue, Khambatta Dance Company, and The Can Can. Thomas has a passion for teaching and shares experience and creates within realms of ballet, contemporary dance, gymnastics, diving, acrobatics, aerial arts, burlesque, and prides himself on being able to survive entry level hip hop classes.
    `
  },
  warrenWoo:{
    id: "warrenWoo",
    name: "Warren Woo",
    headshot: {
      filename:"WarrenWoo.jpg"
    },
    bio: `Warren Woo is a photographer, videographer, yoga instructor, trainer, choreographer, and dancer in the Seattle area. He graduated as a dance major at the University of Washington and actively participated as a dance student association officer, performer, and choreographer, along, with conducting honors research on dance partnering. Born in Hawaii and having to relocate often, he was homeschooled and studied music in his youth. His development as a physical mover began with Ultimate Frisbee, yoga, running and weight training in his late teens. He found his passion for dance in social partner dance and gradually found his way to ballet, contemporary and circus training over the years. Frequently collaborating with those in the area he has had the opportunity to present work at Converge Dance Festival, and perform at the UW, Full Tilt, Strictly Seattle, Men in Dance, Battle for the Dance Belt, and companies including the Cabiri, Karin Stevens Dance, Relay Dance Collective, Northwest Ballet Theater, and more.
    `
  },
};

const emcees = {
  seanCalavan: {
    name: "Sean Calavan",
    role: "Master of Ceremonies",
    url: "/performer.html?performerId=seanCalavan"
  },
  steveDolan:{
    name: "Steve Dolan",
    role: "Master of Ceremonies"
  },
  jjBrychell: {
    name: "JJ Brychell",
    role: "Master of Ceremonies"
  },
  thomasPhelan: {
    name: "Thomas Phelan",
    role: "Master of Ceremonies",
    url: "/performer.html?performerId=thomasPhelan"
  },
  dustinGuyJackson: {
    name: "Dustin Guy Jackson",
    role: "Master of Ceremonies"
  },
  brennaDuffitt: {
    name: "Brenna Duffitt",
    role: "Master of Ceremonies",
    bio: `Brenna grew up in Klamath Falls, OR, where she first developed her interest in theater and acting. While her formal education at Oregon Institute of Technology was focused on engineering, she appeared on stage in many plays and musicals, and has been featured in multiple indie films. More recently, she's been a successful live streamer, hosted multiple online shows, including being the regular host of Power Builds, and does voice acting work. Brenna is excited to be back on stage for her first appearance with Jerboa Dance.`
  },
}

const highlights = {
  jaimeWaliczek: {
    name: "Jaime Waliczek",
    role: "Choreographer",
    url: "/performer.html?performerId=jaimeWaliczek"
  },
  splinterDance: {
    name: "Splinter Dance",
    role: "Dance company",
  },
  parisOriginal: {
    name: "Paris Original",
    role: "Boylesque"
  },
  sarahSchmidt: {
    name: "Sarah Schmidt",
    role: "Musician"
  },
  jenWagner: {
    name: "Jen Wagner",
    role: "Musician"
  },
  seanCalavanDragQueen: {
    name: "Sean Calavan",
    role: "Drag Queen",
    url: "/performer.html?performerId=seanCalavan"
  },
  emmaCurtiss: {
    name: "Emma Curtiss",
    role: "Cyr wheel",
    bio: `Emma Curtiss has been performing circus for many years now. She currently coaches at the School of Acrobatics and New Circus Arts in Seattle and is one of the founders of the IMPulse Circus Collective.
    <p>
    Always seeking out ways to revolve, orbit and glide, her focus of late has been on her Roue Cyr (Cyr wheel).
    <p>
    Her disciplines also include Aerials and Fan Juggling.
    `
  },
  taePhoenix: {
    name: "Tae Phoenix",
    role: "Musician",
    url: "https://taephoenix.com/"
  },
  andreasFetz:{
    name: "Andreas Fetz",
    role: "Arm Balancer",
    url: "/company/AndreasFetz.html"
  },
  scottoMoore:{
    name: "Scotto Moore",
    role: "Comedian",
    url: "http://scotto.org/"
  },
  randiRascal: {
    name: "Randi Rascal",
    role: "Burlesque",
    url: "http://randirascal.com"
  },
  harmonyGwinn: {
    name: "Harmony Gwinn",
    role: "Flow Artist",
    url: "https://www.facebook.com/HaHaHarmonyy"
  },
  andrewScott: {
    name: "Andrew Scott",
    role: "Drag Queen",
    url: "https://www.facebook.com/andrew.scott.90813236"
  },
  jenniferElder: {
    name: "Jennifer Elder",
    role: "Dancer",
    url: "/company/JenniferElder.html"
  },
  nellWaliczek: {
    name: "Nell Waliczek",
    role: "Poetry Reading"
  },
  katieSawicki: {
    name: "Katie Sawicki",
    role: "Choreographer and Baton Twirler",
    bio: `Katie studied ballet and modern dance at NC School of the Arts, American Dance Festival, Princeton Ballet School, and the Hungarian National Ballet Academy. After performing with Princeton Ballet II and American Repertory Ballet Katie retired from performing and taught ballet, jazz, tap and gymnastics for several years before moving to Seattle.  She has performed in Seattle with Arc Dance Productions, XODO, Eastside Moving Company, and others.
    `
  },
  marcVonHolzen: {
    name: "Marc von Holzen",
    role: "Afterparty DJ",
    url: "http://www.soundcloud.com/marcvh"
  },
  ajRogers: {
    name: "AJ Rogers",
    role: "Acrobat",
    url: "http://www.omculture.com/wallingford-class-descriptions"
  },
  hannahDuffy: {
    name: "Hannah Duffy",
    role: "Musician",
    url: "https://www.facebook.com/hannahduffymusic"
  },
  noellePrice: {
    name: "Noelle Price",
    role: "Spoken Word",
    url: "https://www.pricearts.co/copy-of-about"
  },
  tomTomThePhenomenon: {
    name: "TomTom The Phenomenon",
    role: "Burlesque"
  },
  jessicaGlein: {
    name: "Jessica Glein",
    role: "Pole Performer"
  },
  theLoveShowNYC:{
    name: "The Love Show NYC",
    role: "Guest Choreography",
    url: "http://www.theloveshownyc.com/"
  },
  sebastianLangeAndMajaZavaljevski: {
    name: "Sebastian Lange and Maja Zavaljevski",
    role: "Musicians"
  },
  christinaJohnson: {
    name: "Christina Johnson",
    role: "Burlesque"
  },
  brandonMilner: {
    name: "Brandon Milner",
    role: "Musician"
  },
  gypsyLeo: {
    name: "Gypsy Leo",
    role: "Burlesque"
  },
  lizaZurlinden: {
    name: "Liza Zurlinden",
    role: "Violinist"
  },
  nikoLeo: {
    name: "Niko Leo",
    role: "Magician"
  }
};

const shows = {
  unhinge:{
    id:"unhinge",
    name: "Unhinge",
    description:`Mark your calendars for Jerboa’s next show, Unhinge, coming in February 2023. Unhinge will be hosted by our fabulous emcee, Brenna Duffitt, and feature cyr wheel, a magician, live violin, along with our quintessential athletic dance. We are back to our partnering antics and will be exploring the ways in which we are all labeled and put into boxes that are too small for the entirety of who we are as humans. Come enjoy this entertaining jaunt through serious to absurd and take a break from your regularly scheduled life. We cannot wait to see you!`,
    headerImage: {
      filename:"unhinge.jpg"
    },
    performances:[
      {
        dates: "February 3rd, 4th, 10th, and 11th 2023",
        showtimes: [ "2/3 7:00pm", "2/4 3:00pm", "2/4 7:00pm", "2/10 7:00pm", "2/11 7:00pm"],
        startDate: new Date(2023, 2, 3),
        endDate: new Date(2023, 2, 11),
        venue: venues.yawTheater,
        ticketTiers: [
          {
            name: "VIP tickets $60 presale, $75 at the door",
            description: "Front row seats, champagne, and chocolate included"
          },
          {
            name: "GA tickets $25 presale, $30 at the door",
            description: "$5 kids’ tickets for the family-friendly Saturday 2/4 matinee with kid participation",
          }
        ],
        emcee: emcees.brennaDuffitt,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.emmaCurtiss,
          highlights.nikoLeo,
          highlights.lizaZurlinden
        ],
        companyMembers: [
          companyMembers.jaimeWaliczek, 
          companyMembers.seanCalavan, 
          companyMembers.lauranDrackett,
          companyMembers.stellaKutz, 
          companyMembers.constanzeVillines, 
          companyMembers.warrenWoo
        ]
      }
    ]
  },
  delirium: {
    id: "delirium",
    name: "Delirium",
    description: `Jerboa Dance is back for another cabaret show! <i>Delirium</i> will take you on a wild ride filled with dance, acrobatics, circus, and more all curated by our fabulous emcee. Expect our signature style and playfulness as we celebrate the ability to perform <b>LIVE</b> for our audiences that we have so sorely missed. This show is all about fun and entertainment including guest appearances from some previous audience favorites. Come join in the excitement of live performance happening again. We cannot wait to see you!
    <p>
    Covid protocols will apply. All attendees must show proof of vaccination or a negative covid test at the door to attend. Masks will be required for this event. Performers are all fully vaccinated and will take a covid test prior to the show weekend, but they will be unmasked during the performance. For more information on safety measures, please email info@jerboadance.com.
    <p>
    If you would like to attend, but are unable to afford the ticket price, please let us know. Jerboa Dance wants to keep the arts accessible for as many people as possible.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "February 11th, 12th, and 13th 2022",
        showtimes: [ "2/11 7:00pm", "2/11 9:00pm", "2/12 7:00pm", "2/12 9:00pm", "2/13 2:00pm"],
        startDate: new Date(2022, 2, 11),
        endDate: new Date(2022, 2, 13),
        venue: venues.yawTheater,
        bptId: 5337210,
        ticketTiers: [
          {
            name: "VIP tickets $60 presale, $75 at the door",
            description: "Front row seats, champagne, and chocolate included"
          },
          {
            name: "GA tickets $25 presale, $30 at the door",
            description: "$5 kids’ tickets for the family-friendly Sunday matinee with kid participation and a shorter program",
          }
        ],
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.stellaKutz,
          companyMembers.warrenWoo,
          companyMembers.christopherEMontoya,
          companyMembers.angelaSchmidt,
          companyMembers.seanCalavan
        ],
        emcee: emcees.brennaDuffitt,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.emmaCurtiss,
          highlights.jessicaGlein
        ]
      }
    ]
  },
  moxie: {
    id: "moxie",
    name: "Moxie",
    description: `“Moxie” – force of character, determination, or know-how
    <p>
    Jerboa Dance Company will take you on an emotional escapade through time, from a 1920’s beach party to a 1950’s technological snafu and the timeless landscape inside our minds. The emcee will lead you on a journey full of dance, acrobatics, music, and more. You will be riveted by these fantastic artists as they tantalize and perform their hearts out in this evening length cabaret. 
    <p>
    If there is a concept that Jerboa embodies, moxie is it. We explore complex themes and have multiple meanings inside every work. While we always have a story to tell, we hope that it is both compelling and entertaining for our audiences. Our art is intended to be innovative and thought provoking as to inspire your own interpretation. We love when our art gets taken in a new direction with different perspectives.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "February 14th, 15th, 21st, 22nd 2020",
        startDate: new Date(2020, 2, 14),
        endDate: new Date(2020, 2, 22),
        venue: venues.yawTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek, 
          companyMembers.lauranDracket, 
          companyMembers.anjaKellnerRogers,
          companyMembers.stellaKutz,
          companyMembers.gabeMaddox,
          companyMembers.laurenSlater,
          companyMembers.constanzeVillines,
          companyMembers.warrenWoo 
        ],
        emcee: emcees.seanCalavan,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.emmaCurtiss,
          highlights.taePhoenix
        ]
      }
    ]
  },
  reconstruct: {
    id: "reconstruct",
    name: "Reconstruct",
    description: `Jerboa Dance's Jaime Waliczek created new work with Stella Kutz and performed with the Gray for this contemporary show.  
    <p>
    RECONSTRUCT is the first enterprise of Pitch+Roll Productions, dedicated to building community and audience in the dance and art scene in Seattle. In this first installment, Jaime Waliczek of Jerboa Dance and Stella Kutz of Yaw Theater teamed up to create Notions//Forms, joined by Beth Terwilliger's <a href="https://thegraydance.com">The Gray</a>, building on the theme of reconstruction.
    <p>
    Situations can overwhelm us, and reduce us to splinters and rubble. Often times, this is a necessary tribulation, just the beginning of us coming through to be better, more actualized humans. The wound is the place where the light enters you-Rumi. 
    <p>
    Or perhaps it is the reconfiguring of ideas, the idea that with more knowledge that has been dug up, or differently organized concepts, a new picture is discovered, with more depth and intrigue than before. These ideas are explored by the companies in an evening length dance concert at Yaw Theater, in the Georgetown neighborhood of Seattle, May 31st-June 2nd.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "May 31st - June 2nd 2019",
        startDate: new Date(2019, 5, 31),
        endDate: new Date(2019, 6, 2),
        venue: venues.yawTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek, 
          companyMembers.stellaKutz
        ]
      }
    ]
  },
  embrace:{
    id: 'reconstruct',
    name: "Embrace",
    description:`Jerboa delights with another cabaret filled with entertainment and physicality. We will dazzle you with dance, music, acrobatics, circus, and burlesque. Join us on a journey from the jazz club to the apocalypse while we explore power and gender. Come embrace life in all its weirdness with these fantastic performers.
    <p>
    All evening performances will be followed by a jazz and swing afterparty so stay to meet the performers and dance.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "February 14th, 15th, 16th 2019",
        startDate: new Date(2019, 2, 14),
        endDate: new Date(2019, 2, 16),
        venue: venues.yawTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.shannonAdams,
          companyMembers.stellaKutz,
          companyMembers.constanzeVillines,
          companyMembers.chelseaReinschmidt,
          companyMembers.alexandriaSipe,
          companyMembers.warrenWoo
        ],
        emcee: emcees.thomasPhelan,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.ajRogers,
          highlights.emmaCurtiss,
          highlights.hannahDuffy, 
          highlights.noellePrice,
          highlights.tomTomThePhenomenon
        ]
      }
    ]
  },
  animalNature: {
    id: "animalNature",
    name: "Animal Nature",
    description: `Jerboa Dance presented an evening of revelry and sensuality, journeying from political to mystical. Acts featured Jerboa’s signature athletic and emotional style. Special guests included live music, circus arts, burlesque, and more. Friday and Saturday evening shows were followed by live DJs.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "February 9th, 10th, 11th 2018",
        startDate: new Date(2018, 2, 9),
        endDate: new Date(2018, 2, 11),
        venue: venues.yawTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.christinaJohnson,
          companyMembers.seanCalavan,
          companyMembers.renadoTozer,
          companyMembers.stellaKutz,
          companyMembers.andresLopez,
          companyMembers.karenGrady,
          companyMembers.constanzeVillines,
          companyMembers.alexUng
        ],
        emcee: emcees.dustinGuyJackson,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.theLoveShowNYC,
          highlights.sebastianLangeAndMajaZavaljevski,
          highlights.christinaJohnson,
          highlights.emmaCurtiss,
          highlights.brandonMilner,
          highlights.gypsyLeo,
          highlights.andrewScott,
          highlights.ajRogers
        ]
      }
    ]
  },
  continuum: {
    id: "continuum",
    name: "continuum",
    description:`<i>continuum</i> is an exploration the complexities of human relationships and the patterns we fall into, both good and bad. As is Jerboa Dance’s style, it is an acrobatic, energetic work relying on raw emotion and the strong technical background of the dancers to draw in the audience. Rather than a story with a clear beginning and end, continuum is a window into the moments of our lives.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    videos: [
      {
        id: "4CucKooBXLM",
        aspectRatio: "16x9"
      }
    ],
    performances: [
      {
        dates: "September 1st & 3rd, 2017 (Bumbershoot)",
        startDate: new Date(2017, 9, 1),
        endDate: new Date(2017, 9, 3),
        venue: venues.centerHouseTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.rachelKoshiol,
          companyMembers.stellaKutz,
          companyMembers.shakiraRaeAdams,
          companyMembers.jacquelynCorcoran,
          companyMembers.seanCalavan,
          companyMembers.andresLopez,
          companyMembers.renadoTozer
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      },
      {
        dates: "March 24th, 25th, 29th, & April 1st, 2017",
        startDate: new Date(2017, 3, 24),
        endDate: new Date(2017, 4, 1),
        venue: venues.centerHouseTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.meganCourtney,
          companyMembers.bridgetGunning,
          companyMembers.shakiraRaeAdams,
          companyMembers.jacquelynCorcoran,
          companyMembers.seanCalavan,
          companyMembers.alexUng,
          companyMembers.renadoTozer
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      },
      {
        dates: "June 4th & 5th, 2010",
        startDate: new Date(2010, 6, 4),
        endDate: new Date(2010, 6, 5),
        venue: venues.actTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.sarahChampion,
          companyMembers.meghanShepard,
          companyMembers.finnCronin,
          companyMembers.seanCalavan,
          companyMembers.morganHoughton,
          companyMembers.renadoTozer,
          companyMembers.kristenKissel,
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      }
    ]
  },
  transformation: {
    id: "transformation",
    name: "Transformation",
    description:`Jerboa Dance returned for the second time in 2016 with another new work, Transformation, an athletic, modern exploration of human development from childhood to adulthood, dysfunction, and relationships.`,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances:[
     {
         dates: "Jun 24th & 25th, 2016",
         startDate: new Date(2016, 6, 24),
         endDate: new Date(2016, 6, 25),
         venue: venues.eriksonTheater,
         companyMembers: [
           companyMembers.jaimeWaliczek,
           companyMembers.meghanShepard,
           companyMembers.sarahChampion,
           companyMembers.stellaKutz,
           companyMembers.renadoTozer,
           companyMembers.andreasFetz,
           companyMembers.alexUng,
           companyMembers.karenGrady
         ],
         highlights: [
           highlights.jaimeWaliczek,
           highlights.splinterDance,
           highlights.parisOriginal,
           highlights.sarahSchmidt,
           highlights.jenWagner
         ]
       }
     ]
   },
  luminous:{
    id: "luminous",
    name:"Luminous",
    description:`After a four year hiatus, Jerboa Dance is back! Come in out of the darkness and join us for a fun evening of dance, sexiness, and a DJ’d afterparty. Be entertained by sultry cabaret, witty dialogue, spinning lights, acrobatics, drag, burlesque, and, of course, the sexier side of our modern, athletic partnering.
    <p>
    VIP tickets got seating in front-row tables with wait-service during the show and celebrated Valentine’s Day in style with these exciting seats with complementary drinks and chocolates.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "February 12th, 13th, & 14th 2016",
        startDate: new Date(2016, 2, 12),
        endDate: new Date(2016, 2, 14),
        venue: venues.velocityDanceCenter,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.stellaKutz,
          companyMembers.sarahChampion,
          companyMembers.seanCalavan,
          companyMembers.meghanShepard,
          companyMembers.renadoTozer,
          companyMembers.jenniferElder
        ],
        emcees: emcees.steveDolan,
        highlights:[
          highlights.jaimeWaliczek,
          highlights.andreasFetz,
          highlights.scottoMoore,
          highlights.randiRascal,
          highlights.harmonyGwinn,
          highlights.andrewScott,
          highlights.jenniferElder
        ]
      }
    ]
  },
  genderallySpeaking:{
    id: "genderallySpeaking",
    name: "Genderally Speaking",
    description: `Jerboa Dance stepped outside its standard modern dance repertoire to bring you something sexier. Genderally Speaking was filled with naughty ballerinas, muscled acrobats, sultry temptresses, divalicious queens, and bawdy burlesque by none other than fantastic <a href="http://randirascal.com/">Randi Rascal</a>!
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances:[
      {
        dates: "August 20th, 2010",
        startDate: new Date(2010, 8, 20),
        endDate: new Date(2010, 8, 20),
        venue: venues.centerHouseTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.sarahChampion,
          companyMembers.meghanShepard,
          companyMembers.finnCronin,
          companyMembers.seanCalavan,
          companyMembers.morganHoughton,
          companyMembers.renadoTozer,
          companyMembers.kristenKissel,
        ],
        emcee: emcees.jjBrychell,
        highlights: [
          highlights.jaimeWaliczek,
          highlights.randiRascal,
          highlights.nellWaliczek,
          highlights.seanCalavanDragQueen,
          highlights.katieSawicki, 
          highlights.marcVonHolzen
        ]
      }
    ]
  },
  backFromTheBrink: {
    id:"backFromTheBrink",
    name: "Back From the Brink",
    description: `This acrobatic, energetic modern dance ballet takes audiences on a gripping journey into the human psyche. Conceived around the classic stages of grief, Act I begins after a traumatic event leads the dancers to reflect on their lives. Act II moves into the discovery of how to push forward, build new relationships, find community, and hope.
    `,
    headerImage: {
      filename:"header.small.jpg"
    },
    performances: [
      {
        dates: "September 17th & 18th, 2010",
        startDate: new Date(2010, 9, 17),
        endDate: new Date(2010, 9, 18),
        venue: venues.actTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.christinaJohnson,
          companyMembers.sarahChampion,
          companyMembers.renadoTozer,
          companyMembers.kristenKissel,
          companyMembers.meghanShepard,
          companyMembers.jenniferElder,
          companyMembers.seanCalavan
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      },
      {
        dates: "February 13th & 14th, 2009",
        startDate: new Date(2009, 2, 13),
        endDate: new Date(2009, 2, 14),
        venue: venues.actTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.christinaJohnson,
          companyMembers.elizabethBurwell,
          companyMembers.ericVlach,
          companyMembers.pamVlach,
          companyMembers.meghanShepard,
          companyMembers.davidLorenceSchleiffers,
          companyMembers.pamelaTurpin
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      },
      {
        dates: "November 14th, 15th, 16th, & 17th, 2007",
        startDate: new Date(2007, 11, 14),
        endDate: new Date(2007, 11, 17),
        venue: venues.hudsonGuildTheater,
        companyMembers: [
          companyMembers.jaimeWaliczek,
          companyMembers.christinaJohnson,
          companyMembers.elizabethBurwell,
          companyMembers.ericVlach,
          companyMembers.noaSagie,
          companyMembers.adamPellegrine,
          companyMembers.hannaLeeSakakibara,
          companyMembers.julieSmith
        ],
        highlights: [
          highlights.jaimeWaliczek
        ]
      }
    ]
  },
};

export {
  shows,
  companyMembers
}