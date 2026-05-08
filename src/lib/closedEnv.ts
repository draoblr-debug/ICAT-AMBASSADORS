import { User, Role } from '../types';

const FACULTY_CSV = `Employee ID,Faculty Members,Specializations,E mail,Role
BLR001,Monisha k,Interior Design,monisha.k@icat.ac.in,Tutor
BLR002,Revathy E S,Interior Design,revathy.es@icat.ac.in,HOD
BLR003,Sugumar Gowtham Thamotharapandian,Graphic Design,sugumar.gowtham@icat.ac.in,HOD
BLR004,Riya Premanand Gaonker,Graphic Design,riya.gaonker@icat.ac.in,Tutor
BLR005,Abhishek Reddy,Graphic Design,abhishek.r@icat.ac.in,Tutor
BLR006,Sunil PN,Animation,sunil.pn@icat.ac.in,HOD
BLR007,Sharan Kumar Ramagouda,Animation,sharan.r@icat.ac.in,Tutor
BLR008,Akhil Shaji,Animation,akhil.shaji@icat.ac.in,Tutor
BLR009,Sandeep S Anand,Game Design,sandeep.s@icat.ac.in,HOD
BLR010,Pranav AS,Game Design,pranav.as@icat.ac.in,Tutor
BLR011,Sachin,Game Design,sachin@icat.ac.in,Tutor
BLR012,Roja R,Game Design,roja.r@icat.ac.in,Tutor
BLR013,Jibin Geeson,Game Design,jibin.g@icat.ac.in,Tutor
BLR014,Mandala Puneeth Naidu,Game Design,puneeth.m@icat.ac.in,Tutor
BLR015,Tapan Kumar Roy,Game Design,tapan.r@icat.ac.in,Tutor
BLR016,Sandeep Chakravarthy H M,UI/UX,sandeep.hm@icat.ac.in,HOD
BLR017,Kamran Haider,UI/UX,kamran.haider@icat.ac.in,Tutor
BLR018,Nirmal Kumar M,Photography,nirmalkumar.m@icat.ac.in,HOD
BLR019,Karthik A Hegde,Photography,karthik.a@icat.ac.in,Tutor
BLR020,Nagalakshmi N,Fashion Design,nagalakshmi.n@icat.ac.in,Tutor
BLR021,Jishnu N K,Visual Effects,jishnu.nk@icat.ac.in,HOD
BLR022,Lalu v,Visual Effects,lalu.v@icat.ac.in,Tutor
BLR023,Pradeep P,Multimedia,pradeep.p@icat.ac.in,Tutor
BLR024,John William Carey J,Multimedia,john.william@icat.ac.in,HOD
BLR025,Shikhar Khatri,Photography,shikhar.k@icat.ac.in,Tutor
BLR026,Rajeev AG,Administration,drao.blr@icat.ac.in,Education Manager
BLR027,Dr. Sudheshna Das,Administration,viceprincipal.blr@icat.ac.in,Education Manager
BLR028,S.Hemachandran,Administration,hemachandran@icat.ac.in,System Administrator
BLR029,Pradeepa H,Administration,pradeepa.h@icat.ac.in,Student Service
BLR030,Shreyas Kumar,Administration,shreyas@imageil.com,Student Service
BLR031,Hema Nanjappa P,Administration,studentservice.blr@icat.ac.in,Student Service
BLR032,Praveen K,Administration,praveen.k@icat.ac.in,Student Service
BLR033,Lakshmi K,Administration,lakshmi.k@icat.ac.in,Dean`;

const STUDENT_CSV = `College ID,Name,Program ID,Year,Mail id,Role
2025UG05015,KETHIREDDY BHAVITHA,BSc Fashion and Apparel Design,1,bhavithakethireddy@gmail.com,Student
2025UG05006,Lekha. S,BSc Fashion and Apparel Design,1,shivalekha78@gmail.com,Student
2025UG05012,Moubani Nayak,BSc Fashion and Apparel Design,1,nayak.mou2003@gmail.com,Student
2025UG05001,Vaishali M.K,BSc Fashion and Apparel Design,1,vaishalinaren47@gmail.com,Student
2025UG05016,Vanam Nithin Datta,BSc Fashion and Apparel Design,1,vanamnithinabd17@gmail.com,Student
2025UG05011,Ahammed Nihal v,BVA Animation and Game Art,1,nihalvadakkan7@gmail.com,Student
2025UG05005,A FREDRICK ROSHAN ,BVA Animation and Game Art,1,Fredyrosh6@gmail.com,Student
2025UG05004,Fredrick fernando,BVA Animation and Game Art,1,Fredifdo2007@gmail.com,Student
2025UG05013,Nikitha suthar,BVA Animation and Game Art,1,nikithasutharsuthar@gmail.com,Student
2025UG05010,RANEEM MOHAMED K,BVA Animation and Game Art,1,mohdraneem065@gmail.com,Student
2025UG05008,Ayush Dhar,BVA Graphics and Communication Design,1,ayushdhar64@gmail.com,Student
2025UG05002,Boggarapu Hansitha,BVA Graphics and Communication Design,1,hansiboggarapu@gmail.com,Student
2025UG05009,Swathi N salimath,BVA Graphics and Communication Design,1,swathisalimath617@gmail.com,Student
2025UG05003,Vineet karari,BVA Graphics and Communication Design,1,Kararivineet@gmail.com,Student
2025UG05017,Vivin Arora,BVA Graphics and Communication Design,1,vivinarora5717@gmail.com,Student
2025UG05018,Joyal Bernold N,BVA Graphics and Communication Design,1,richardjoyal9380@gmail.com,Student
2025UG06013,Agnibhu Mitra,BSc Game Design & Development,1,agnihero2006@gmail.com,Student
2025UG06091,Harikrishna Vlavil Sunil,BSc Game Design & Development,1,thehar4017m@gmail.com,Student
2025UG06046,Niraj Rai,BSc Game Design & Development,1,nirajrai200617@gmail.com,Student
2025UG06023,Bihan Kar Choudhury,BSc Game Design & Development,1,bihanrio2007@gmail.com,Student
2025UG06054,Dharan M,BSc Game Design & Development,1,dharan2028@gmail.com,Student
2025UG06022,Joshua Praveen Selvaraj J,BSc Game Design & Development,1,joshuaselvaraj08@gmail.com,Student
2025UG06070,Joshua Samuel Singh,BSc Game Design & Development,1,joshuasamuel1325@gmail.com,Student
2025UG06099,Kishan D Yadav,BSc Game Design & Development,1,Lookiezzurstylematters@gmail.com,Student
2025UG06008,Oliver L,BSc Game Design & Development,1,olivermcl2007@gmail.com,Student
2025UG06102,Pratyush Panicker,BSc Game Design & Development,1,panickerpratyush@gmail.com,Student
2025UG06087,CHINTAPATLA SRI SAI CHARAN,BSc Media Technology,1,charanchintapatla23@gmail.com,Student
2025UG06009,Deepthi Hari,BSc Media Technology,1,deepthihari08@gmail.com,Student
2025UG06075,Katil Abhijeet Jitesh,BSc Media Technology,1,abhijeetkatil@gmail.com,Student
2025UG06078,Mukkamalla Harshavardhan Reddy,BSc Media Technology,1,mukkamallaharshareddy16@gmail.com,Student
2025UG06014,Saahil Khan,BSc Media Technology,1,khan.saahil2120@gmail.com,Student
2024UG06046,ABHINEETH MENON ,BSc Game Art & Design,2,abhineethmenon2006@gmail.com,Student
2024UG06013,ABIJIT A,BSc Game Art & Design,2,abijitajaykhosh@gmail.com,Student
2024UG06039,Aditya Rishu ,BSc Game Art & Design,2,aditya.rishu11@gmail.com,Student
2024UG06054,AMARAPINNI VASDEV,BSc Game Art & Design,2,amarapinni.vasdev@gmail.com,Student
2024UG06051,Avilash Das,BSc Game Art & Design,2,avilashdas2006@gmail.com,Student
2024UG06126,G Hrishikesh,BSc Game Art & Design,2,hrishikesh202005@gmail.com,Student
2024UG06097,Yakasiri Suresh,BSc Game Art & Design,2,sureshyakasiri2004@gmail.com,Student
2024UG06068,Advaith Santhosh,BSc Game Design & Development,2,santhoshadvaith10@gmail.com,Student
2024UG06010,Gokul Krishnan ,BSc Game Design & Development,2,gk6761394@gmail.com,Student
2024UG06108,Jagadeesan.M,BSc Game Design & Development,2,jagadeesanmello@gmail.com,Student
2024UG06019,Mubeen M,BSc Game Design & Development,2,mubeenm2005@gmail.com,Student
2024UG06088,Muhammed Saahil M Shias,BSc Game Design & Development,2,Saahilem@gmail.com,Student
2024UG06104,Rishi Raavan Reddy Bommareddy,BSc Game Design & Development,2,rishiraavan@gmail.com,Student
2024UG06014,Shaik imam saheb,BSc Game Design & Development,2,imamsaheb997@gmail.com,Student
2024UG06056,Arjun K,BSc Media Technology,2,aarjun26310@gmail.com,Student
2024UG06086,ASHIEL JOSEPH A T,BSc Media Technology,2,ashieljoseph14@gmail.com,Student
2024UG06143,Jyothi Krishna,BSc Media Technology,2,jyothikrishnapsy911@gmail.com ,Student
2024UG06123,Md. Afzal Ahmed Choudhury,BSc Media Technology,2,sein85856009@gmail.com,Student
2024UG06012,S HARIGOVIND,BSc Media Technology,2,harigovinds995@gmail.com,Student
2024UG06089,SANADUL SINAN,BSc Media Technology,2,sinansanadul@gmail.com,Student
2024UG06139,UDITH S M,BSc Media Technology,2,udithsm2005@gmail.com,Student
2024UG06153,M Chandu Prakash,BSc Media Technology,2,yuvaprasad307@gmail.com,Student
2024UG06075,Jayanth L R,BSc Photography,2,jayanth81485@gmail.com,Student
2024UG06061,Monish M Reddy ,BSc Photography,2,monishmreddy123@gmail.com,Student
2024UG06131,Nuthendra ,BSc Photography,2,Nuthendra7128@gmail.com,Student
2024UG06148,Nyathappa Gari Girish ,BSc Photography,2,bngirishajay143@gmail.com,Student
2024UG06074,Shakti j,BSc Photography,2,shakthi412006@gmail.com,Student
2023UG06142,Michal biju,BSc Photography,2,Michalbiju11@gmail.com,Student
2024UG06080,Thrieshaan M B,BSc Photography,2,thrieshaanmb@gmail.com,Student
2024UG06110,ABHISHEK PK,BSc UI/UX Design,2,aabhi224941@gmail.com,Student
2024UG06111,ADITHYAN PK,BSc UI/UX Design,2,adithyanpk587@gmail.com,Student
2024UG06109,Jain Khushi Sumit,BSc UI/UX Design,2,janvij2606@gmail.com,Student
2024UG06146,NIRMAL MATHEW,BSc UI/UX Design,2,nirmalmathewbaby@gmail.com,Student
2024UG06055,SAUMYA,BSc UI/UX Design,2,Saumyatia1@gmail.com,Student
2024UG06116,Shreyas S,BSc UI/UX Design,2,Shreyas1707ga@gmail.com,Student
2024UG06065,AKHIL A K,BSc Visual Effects,2,akhil32523@gmail.com ,Student
2024UG06072,Devadathan M,BSc Visual Effects,2,d3vadathan@gmail.com,Student
2024UG06127,Eamon Duron Xavier Almeida ,BSc Visual Effects,2,eamonalmeida67@gmail.com,Student
2024UG06011,Sayed konain pasha ,BSc Visual Effects,2,konainpashashop@gmail.com,Student
2024UG05001,ABHISHEK REUBEN KOSHY,BVA Animation and Game Art,2,arkoshy006@gmail.com,Student
2024UG05027,Anujna B Rao,BVA Animation and Game Art,2,anujnabrao@gmail.com,Student
2024UG05005,Ayush Singh,BVA Animation and Game Art,2,singhbro1001@gmail.com,Student
2024UG05021,Gregary Santhosh ,BVA Animation and Game Art,2,gregarysanthosh25@gmail.com,Student
2024UG05010,Hostin Alexander Gonsalves,BVA Animation and Game Art,2,hostingonsalves93@gmail.com,Student
2024UG05019,I.Kunal,BVA Animation and Game Art,2,kunalmj581@gmail.com,Student
2024UG05022,Mirigang Biswajit Das,BVA Animation and Game Art,2,mrigangdas2212@gmail.com,Student
2024UG05011,Mohandass,BVA Animation and Game Art,2,mohandassethurasu@gmail.com,Student
2024UG05018,Mrinal Das,BVA Animation and Game Art,2,rd692739@gmail.com,Student
2024UG05017,Rahul Robin ,BVA Animation and Game Art,2,rahulrobin18@gmail.com,Student
2024UG05020,Rahunath,BVA Animation and Game Art,2,rahunath.sm@gmail.com,Student
2024UG05009,Rohnit Prabhraj,BVA Animation and Game Art,2,rohnit919@gmail.com,Student
2024UG05002,SIDDHARTH SHARMA,BVA Animation and Game Art,2,sidd2k20@gmail.com,Student
2024UG05029,Nikesh,BVA Animation and Game Art,2,nikesh11315@gmail.com,Student
2024UG05024,S.Surya Narayana ,BVA Animation and Game Art,2,suryanarayana282006@gmail.com,Student
2024UG05007,B.Tejas,BVA Graphics and Communication Design,2,btejas1010@gmail.com,Student
2024UG05016,Abhyud Therayil,BVA Graphics and Communication Design,2,abhyudtherayil@gmail.com,Student
2024UG05030,Hisham Haneef,BVA Graphics and Communication Design,2,hishamhaneef900@gmail.com,Student
2024UG05004,NEYA. B,BVA Graphics and Communication Design,2,neyabaskar2006@gmail.com,Student
2024UG05012,Niyam Brijesh Sheth,BVA Graphics and Communication Design,2,niyamsheth@gmail.com,Student
2024UG05014,Rithuparnan P S,BVA Graphics and Communication Design,2,rithuparnanpss@gmail.com,Student
2024UG05006,Sristi Saha,BVA Graphics and Communication Design,2,sahasristi21@gmail.com,Student
2024UG05028,Bhavishya R Reddy ,BVA Interior and Spatial Design,2,bhavishyareddy2004@gmail.com,Student
2024UG05026,Gopikka Gopalakrishnan,BVA Interior and Spatial Design,2,gopikka712@gmail.com,Student
2024UG05032,Ruchitha G ,BVA Interior and Spatial Design,2,ruchitharuchitha215@gmail.com,Student
2023UG05041,ALAN RAJ P V,BVA Animation and Game Art,3,alanraj1411@gmail.com,Student
2023UG05049,ANANDHA BHAGYA A P,BVA Animation and Game Art,3,anandhabhagyapa@gmail.com,Student
2023UG05021,ARAVINDH,BVA Animation and Game Art,3,aravindhsri321598@gmail.com,Student
2023UG05032,BALASUBRAMANI.J,BVA Animation and Game Art,3,balasubramani.j001@gmail.com,Student
2023UG05051,BELLAMKONDA VAMSI,BVA Animation and Game Art,3,Vamsinandhansaaho@gmail.com,Student
2023UG05034,BINS B I,BVA Animation and Game Art,3,binscincycincy@gmail.com,Student
2023UG05016,BOOPATHI A,BVA Animation and Game Art,3,boopathi11705@gmail.com,Student
2023UG05028,DHANRAJ K,BVA Animation and Game Art,3,dhanraj.k1024@gmail.com,Student
2023UG05059,DWARAKESH T S,BVA Animation and Game Art,3,dwarakeshx@gmail.com,Student
2023UG05057,FREDDY SAJAN,BVA Animation and Game Art,3,freddysajan2004@gmail.com,Student
2023UG05054,GANGISETTY DURGA SIVA KIRAN,BVA Animation and Game Art,3,kiransivadurga12@gmail.com,Student
2023UG05036,HAYAN HASHIF,BVA Animation and Game Art,3,Hayanhashif218@gmail.com ,Student
2023UG05042,K UMA SHANKAR,BVA Animation and Game Art,3,umas63730@gmail.com,Student
2023UG05053,KARTHIK N M,BVA Animation and Game Art,3,sumakarthik07@gmail.com,Student
2023UG05040,KARTHIK SATISH NAIR ,BVA Animation and Game Art,3,karthiknair0504@gmail.com,Student
2023UG05025,MADHAN A,BVA Animation and Game Art,3,mathanmathan9986@gmail.com,Student
2023UG05048,MD AKIV,BVA Animation and Game Art,3,mdnizamkhan78611@gmail.com,Student
2023UG05039,MD TOUFIQ SHAIKH,BVA Animation and Game Art,3,toufiqsk143668@gmail.com,Student
2023UG05013,MITHIRAN V,BVA Animation and Game Art,3,mithiranvaradarajan@gmail.com,Student
2023UG05022,MUGUNDHAN R,BVA Animation and Game Art,3,mugundhan863@gmail.com,Student
2023UG05047,NAMAN MAHINDRAKAR,BVA Animation and Game Art,3,namanmahindrakar@gmail.com,Student
2023UG05052,NAVANEETH S,BVA Animation and Game Art,3,navynavaneeth14@gmail.com ,Student
2023UG05026,PAVITHRA A,BVA Animation and Game Art,3,pavisbook@gmail.com,Student
2023UG05035,RAKSHIT SUKHPAL,BVA Animation and Game Art,3,rakshitsukhpal05@gmail.com,Student
2023UG05037,REENU HARIHARAN ,BVA Animation and Game Art,3,reenuhariharan@gmail.com,Student
2023UG05018,ROSHINI.R,BVA Animation and Game Art,3,roshroshini9986@gmail.com ,Student
2023UG05012,SHESHADRI,BVA Animation and Game Art,3,sheshadrideshpande2404@gmail.com,Student
2023UG05045,SHREYA G,BVA Animation and Game Art,3,gshreya2492004@gmail.com,Student
2023UG05020,SHREYA. VINOD,BVA Animation and Game Art,3,shreyavinod6@gmail.com,Student
2023UG05050,SHRIDEVI PUTTARAJ VASTRAD,BVA Animation and Game Art,3,Shriuvast4321@gmail.com,Student
2023UG05005,SOUMODIP BISWAS ,BVA Animation and Game Art,3,soumodipbiswas20@gmail.com,Student
2023UG05011,VISHNU VARDHAN.S,BVA Animation and Game Art,3,vishnuvardhan200604@gmail.com,Student
2023UG05055,VIVEK T K,BVA Animation and Game Art,3,krishnakumarkannan435@gmail.com,Student
2023UG05061,AKSHAT GUPTA,BVA Animation and Game Art,3,akshat.sos24@gmail.com,Student
2023UG05010,BHOOMIKA C R,BVA Graphics and Communication Design,3,bhoomikarameshc@gmail.com,Student
2023UG05015,GAURI JAYAKRISHNAN ,BVA Graphics and Communication Design,3,gaurijayakrishnan2020@gmail.com,Student
2023UG05002,GOPIKA K.G,BVA Graphics and Communication Design,3,kggopika98@gmail.com,Student
2023UG05043,JAGATHKISHORE G,BVA Graphics and Communication Design,3,jagath6422@gmail.com,Student
2023UG05017,LIKHITHA P ,BVA Graphics and Communication Design,3,adarkkid@gmail.com,Student
2023UG05019,SWARASHREE B R ,BVA Graphics and Communication Design,3,swarashreebr16@gmail.com,Student
2023UG,S PRAVEEN ,BVA Graphics and Communication Design,3,mspraveen8224@gmail.com,Student
2023UG05031,BHUMI,BVA Interior and Spatial Design,3,bhumidhawan78@gmail.com,Student
2023UG05058,M SANJANA ,BVA Interior and Spatial Design,3,sanjanax45@gmail.com,Student
2023UG05038,NOORAIN HAALA,BVA Interior and Spatial Design,3,Noorain.haala@gmail.com,Student
2023UG05029,VIJETHA SUNAYANA,BVA Interior and Spatial Design,3,kusumavijetha90@gmail.com,Student
2023UG06250,ADITHYAN PK,BSc UI/UX Design,3,adipkadithyan@gmail.com,Student
2023UG06224,ANUPRIYA N P ,BSc UI/UX Design,3,anupriyanp2005@gmail.com,Student
2023UG06015,ARSALAN ALI AHMED,BSc UI/UX Design,3,arsalanaliahmed17@gmail.com,Student
2023UG06236,ARUN P,BSc UI/UX Design,3,arunchandralayam100@gmail.com,Student
2023UG06204,SAMARTH JAIN,BSc UI/UX Design,3,samarthjain.3636@gmail.com ,Student
2023UG06263,SHIVANAND,BSc UI/UX Design,3,v6188812@gmail.com,Student
2023UG06258,SHUBHAM BHARDWAJ ,BSc UI/UX Design,3,s0505bhardwaj@gmail.com,Student
2023UG06237,THEJUS MATHEW,BSc UI/UX Design,3,thejas9645@gmail.com,Student
2023UG06233,VYSHAK. C,BSc UI/UX Design,3,vyshakraj44@gmail.com,Student
2023UG06144,BENIHIN G,BSc Photography,3,photographyben6@gmail.com,Student
2023UG06254,BISWAJIT SEN,BSc Photography,3,biswajitsen6860@gmail.com,Student
2023UG06128,HARISANKAR J,BSc Photography,3,Harisankar51983@gmail.com,Student
2023UG06256,JAMI ASHOK BABU,BSc Photography,3,ashokarjun7416@gmail.com,Student
2023UG06216,JOSHUA JOHNSON,BSc Photography,3,jj1964135@gmail.com,Student
2023UG06114,MOHAMMED MUIZZ KHALANDAR ,BSc Photography,3,Muizz.k101@gmail.com,Student
2023UG06206,MONISHWARAN K ,BSc Photography,3,monishwaran77@gmail.com,Student
2023UG06197,MUSHTAQ M,BSc Photography,3,shakeelmushtaq003@gmail.com,Student
2023UG06255,PRADEEP KUMAR D,BSc Photography,3,Pradeepfox44@gmail.com,Student
2023UG06209,PRAJWAL K R,BSc Photography,3,rajanikanthkkr@gmail.com,Student
2023UG06225,TULASI ABHIRAM,BSc Photography,3,tulasiabhiram303@gmail.com,Student
2023UG06263,VIBUSHA,BSc Photography,3,vibushar011@gmail.com,Student
2023UG06211,VISMAYA I L,BSc Photography,3,vismayaiskakiri@gmail.com,Student
2023UG06222,VUNTLA NITHISHKUMAR REDDY,BSc Photography,3,luckynithish1432@gmail.com,Student
2023UG06210,PATIL SHARDUL NITIN,BSc Media Technology,3,Shardul.patil271@gmail.com,Student
2023UG06215,ABHIRAMY C S,BSc Media Technology,3,abhiramy2005@gmail.com,Student
2023UG06031,MOHAMMED MUKTHAR,BSc Media Technology,3,Muktharmkr123@gmail.com,Student
2023UG06030,KUMAR MIRNAL,BSc Media Technology,3,mrinal8877@gmail.com,Student
2023UG06055,NISHANTH S RAMESH,BSc Media Technology,3,nishanthsramesh6@gmail.com,Student
2023UG06198,ARJUN S,BSc Media Technology,3,achu03kichu@gmail.com,Student
2023UG06235,ANANTHAKRISHNAN B,BSc Media Technology,3,ananthakrishnan8664@gmail.com,Student
2023UG06228,ASWIN KS,BSc Media Technology,3,aswinks111204@gmail.com ,Student
2023UG06246,MONISH S,BSc Media Technology,3,smonish678@gmail.com,Student
2023UG06183,BHUMIREDDY GOKUL NANDAN REDDY,BSc Media Technology,3,gokulnandanreddy@gmail.com,Student
2023UG06079,AJIN SANKAR,BSc Media Technology,3,ajinsankar49@gmail.com,Student
2023UG06207,CHARAN GOUTHAM SINGH,BSc Media Technology,3,singhgoutham8@gmail.com,Student
2023UG06141,AAKASH R S,BSc Media Technology,3,aakashrs5570@gmail.com,Student
2023UG06059,THOTA NIKHIL,BSc Media Technology,3,thotanikhil258@gmail.com,Student
2023UG06135,SIFARATH ROSHAN C S ,BSc Media Technology,3,sifarathroshan4@gmail.com,Student
2023UG06098,ARFA,BSc Game Art & Design,3,Arfa.13iqbal@gmail.com,Student
2023UG06117,HRISHIKESH LOKUR,BSc Game Art & Design,3,lokurhrishikesh@gmail.com,Student
2023UG06189,LAD ATHARVA SANTOSH ,BSc Game Art & Design,3,atharvalad05@gmail.com,Student
2023UG06080,NAYAN BANDU TUPE,BSc Game Art & Design,3,nayantupe89@gmail.com,Student
2023UG06251,PRITHWIRAJ NATH,BSc Game Art & Design,3,prithwirajnath4769@gmail.com,Student
2023UG06097,RAUNAK SINHA,BSc Game Art & Design,3,sinharaunak255@gmail.com,Student
2023UG06143,SIRINGI NIKHIL,BSc Game Art & Design,3,nikhilsiringi99@gmail.com,Student
2023UG06017,VIDIT MODI,BSc Game Art & Design,3,viditmodi05@gmail.com,Student
2023UG06252,WAHED SUHAEL UKAYE,BSc Game Art & Design,3,wahed1905@gmail.com ,Student
2023UG06174,BARATH M,BSc Game Art & Design,3,barathmohan2005k@gmail.com,Student
2023UG06105,MANU ADHIKARI ,BSc Game Art & Design,3,manuadhi94@gmail.com,Student
2023UG06019,ADITHYAN V S,BSc Game Design & Development,3,adiardram@gmail.com,Student
2023UG06260,ARJUN.M.B,BSc Game Design & Development,3,Arjunmab7@gmail.com,Student
2023UG06078,Hanuansh Arya Shrivastava ,BSc Game Design & Development,3,hanuansh0@gmail.com,Student
2023UG06127,JASHWANTH G S,BSc Game Design & Development,3,jeshuy0808@gmail.com ,Student
2023UG06226,JASHWANTH SR,BSc Game Design & Development,3,jashu.777.sr@gmail.com,Student
2023UG06042,KIRAN RAJENDRAKUMAR,BSc Game Design & Development,3,kiranrajendrakumar2811@gmail.com,Student
2023UG06056,KOTA PRAMOD SAINADH,BSc Game Design & Development,3,pramodsainadh123@gmail.com,Student
2023UG06231,MELVIN MATHEW ,BSc Game Design & Development,3,mathewmelvin029@gmail.com,Student
2023UG06113,N SAI THARUN JANARDHAN,BSc Game Design & Development,3,synchronousgamingyt@gmail.com,Student
2023UG06021,Naman Chopra,BSc Game Design & Development,3,namanchopra339@gmail.com,Student
2023UG06130,NIKHIL K A,BSc Game Design & Development,3,kaippilly.nikhil@gmail.com,Student
2023UG06253,NILAY PANDEY ,BSc Game Design & Development,3,nilayp2005@gmail.com,Student
2023UG06136,NIRANJAN JAYAN,BSc Game Design & Development,3,niranjan.jayan111@gmail.com,Student
2023UG06112,PERUMAL POTHAN NAGESH,BSc Game Design & Development,3,Pepoperumal262@gmail.com,Student
2023UG06054,ROSHAN H ,BSc Game Design & Development,3,tigerboss46888@gmail.com,Student
2023UG06044,VIGNESH CHARAN S ,BSc Game Design & Development,3,vikkydancer007@gmail.com,Student
2023UG06102,SAHIL MAHAWAR,BSc Game Design & Development,3,sahilmahawar0605@gmail.com,Student
2023UG06248,SIFIN JIJO,BSc Game Design & Development,3,sifinjijo007@gmail.com,Student
2023UG06013,Sravan Sushil,BSc Game Design & Development,3,srysrvn@gmail.com,Student
2023UG06018,VAIBHAV BISHT,BSc Game Design & Development,3,vaibhavbisht52@gmail.com,Student
2023UG06020,DHANUSH ADHITHYAN J D,BSc Game Design & Development,3,adhithyandhanush8@gmail.com,Student
2023UG06129,ABHIJITH T K,BSc Visual Effects,3,abhijithtk651@gmail.com,Student
2023UG06186,AKAASH P R,BSc Visual Effects,3,akaashak09@gmail.com,Student
2023UG06262,ALAN THEJAS,BSc Visual Effects,3,alanthejas3124@gmail.com,Student
2023UG06104,Aman Jain,BSc Visual Effects,3,jaina3039@gmail.com,Student
2023UG06218,DHARUN KUMAR J,BSc Visual Effects,3,tharunkumar3010@gmail.com,Student
2023UG06229,DUDHATRA VAIBHAV ,BSc Visual Effects,3,vaibhavdidhatra678@gmail.com,Student
2023UG06230,HASIN HOSSAIN ,BSc Visual Effects,3,gamingawesome157@gmail.com,Student
2023UG06028,KOTAPROLU SAI CHARAN,BSc Visual Effects,3,charan.mail2006@gmail.com,Student
2023UG06070,MD ABDULLAH NASIR ,BSc Visual Effects,3,abdullahkhan53412@gmail.com,Student
2023UG06014,SREERAM VINOD K,BSc Visual Effects,3,Sreeramvinod916@gmail.com,Student
2023UG06188,V GOURI CHARAN,BSc Visual Effects,3,charanicat722@gmail.com,Student
2023UG06261,VINAYAKAN P.A,BSc Visual Effects,3,Vinayakanvinu44@gmail.com,Student
2022UG05003,SAKSHI DESAI,BVA Animation and Game Art,4,desai.sakshi05@gmail.com,Student
2022UG05019,D SIMI SINDHU,BVA Animation and Game Art,4,dharmendrannaidu1976@gmail.com,Student
2022UG05010,DHANALAKSHMI N,BVA Animation and Game Art,4,dhanalakshmi042005@gmail.com,Student
2022UG05028,SHIRSO CHATTERJEE,BVA Animation and Game Art,4,chatterjeeshirso@gmail.com,Student
2022UG05038,KURUBA PUJARI RAVI TEJA,BVA Animation and Game Art,4,kpraviteja444@gmail.com,Student
2022UG05047,SHUBHAM GURUNG,BVA Animation and Game Art,4,SHUBUTAMU@GMAIL.COM,Student
2022UG05051,SHIVA SAI H R,BVA Animation and Game Art,4,shivasaihr16@gmail.com,Student
2022UG05005,SARATH RAJU,BVA Animation and Game Art,4,Sharathr2002@gmail.com,Student
2022UG05017,RAHUL KRISHNA.R,BVA Animation and Game Art,4,luharluhar0987@gmail.com,Student
2022UG05002,BARATH KRISHNA P J,BVA Animation and Game Art,4,kichuttan078@gmail.com,Student
2022UG05027,GOWTHAM M,BVA Animation and Game Art,4,GOWTHAM172641@GMAIL.COM,Student
2022UG05016,CHRIS VIVIN FRANCIS,BVA Animation and Game Art,4,chrisvivin77@gmail.com,Student
2022UG05033,SABARISH S S,BVA Animation and Game Art,4,sabarishca2004@gmail.com,Student
2022UG05030,SARVESHWARAN J P,BVA Animation and Game Art,4,basearts232004@gmail.com,Student
2022UG05034,SANJAY S,BVA Animation and Game Art,4,sujasanthosh947@gmail.com,Student
2022UG05045,TOM JOSEPH M,BVA Animation and Game Art,4,tomjoseph9876@gmail.com,Student
2022UG05041,NIKILAN M,BVA Animation and Game Art,4,nikilkalpana@gmail.com,Student
2022UG05053,SUJAN N,BVA Animation and Game Art,4,sujantellis77@gmail.com,Student
2022UG05054,ADARSH SHANKARAPPA NAREGAL,BVA Animation and Game Art,4,adarshnaregal@gmail.com,Student
2022UG05035,MINAL PARIHAR,BVA Graphics and Communication Design,4,minalparihar1@gmail.com,Student
2022UG05011,SIDRA SIDDIQUI,BVA Graphics and Communication Design,4,sidrasiddiqui2513@gmail.com,Student
2022UG05009,ALEN K AJI,BVA Graphics and Communication Design,4,alenaji6102004@gmail.com,Student
2022UG05025,ARCHITH F BARNS,BVA Graphics and Communication Design,4,afbarns@gmail.com,Student
2022UG05036,ARZ AHMED,BVA Graphics and Communication Design,4,arzvp04@gmail.com,Student
2022UG05004,RAASHI SWAMI,BVA Graphics and Communication Design,4,raashiswami22@gmail.com,Student
2022UG05031,SREE KANTH M P,BVA Graphics and Communication Design,4,sreekanthmp312@gmail.com,Student
2022UG05049,DHEERAJ GOPI,BVA Graphics and Communication Design,4,dheerajgopi007@gmail.com,Student
2022UG05014,AGNEY G S,BVA Graphics and Communication Design,4,agneypba@gmail.om,Student
2022UG05008,SACHIT BHARDWAJ,BVA Graphics and Communication Design,4,sachitbhardwaj0@gmail.com,Student
2022UG05015,ADVENTINA A M,BVA Graphics and Communication Design,4,adventina2004@gmail.com,Student
2022UG05029,SHREYA HEGDE,BVA Graphics and Communication Design,4,SHREYAHEGDE087@GMAIL.COM,Student
2022UG05044,PALLAVI KUMARI PRASAD,BVA Graphics and Communication Design,4,prasadpallavi893@gmail.com,Student
2022UG05024,ARUN KUMAR K J,BVA Graphics and Communication Design,4,jagadeesanmani15@gmail.com,Student
2022UG05018,SUHAS R,BVA Interior and Spatial Design,4,SUHAS9611322953@GMAIL.COM,Student
2022UG05037,RAJUWAN CHOUDHARY,BVA Interior and Spatial Design,4,rajuwanchoudhary@gmail.com,Student
2022UG05023,JUVERIA KHATOON,BVA Interior and Spatial Design,4,juveriakhan313@gmail.com,Student
2022UG05020,KOPPARAPU VANDITH KRISHNA,BVA Interior and Spatial Design,4,vandithkrishna6@gmail.com,Student
2022UG05040,POOJA JAYAPRAKASH,BVA Interior and Spatial Design,4,poojajayaprakash924@gmail.com,Student
2022UG05052,NITHIN K S,BVA Interior and Spatial Design,4,nithinniths14@gmail.com,Student
2025PG03003,Alver Agnelo Furtado,PGPP Game Design,1,alverfurtado@gmail.com,Student
2025PG03012,Gowtham G Rao,PGPP Game Design,1,gowthamgrao123@gmail.com,Student
2025PG03005,Harish V,PGPP Game Design,1,harianitha1798@gmail.com,Student
2025PG03014,Jeevanth Krishna,PGPP Game Design,1,jeevanth221@gmail.com,Student
2025PG03007,SAMUEL M,PGPP Game Design,1,mathewsamuelj22@gmail.com,Student
2025PG03002,Sharon Harshini A,PGPP Game Design,1,harshinisharon13@gmail.com,Student
2025PG03015,Siddharth V K,PGPP Game Design,1,vksiddharth16@gmail.com,Student
2025PG03008,VISHAL V,PGPP Game Design,1,vishal54534@gmail.com,Student
2025PG03010,Abhinay. T. S,PGPP UI/UX,1,abhinayappu6@gmail.com,Student
2025PG03009,Charan Billava,PGPP UI/UX,1,charanpoojari266@gmail.com,Student
2025PG03013,JINU BENNY P A,PGPP UI/UX,1,jinubenny319@gmail.com,Student
2025PG03016,MALLIKARJUN HUNASIKATTI,PGPP UI/UX,1,abhimallikarjun123@gmail.com,Student
2025PG03001,Manish Kumar Sinha,PGPP UI/UX,1,manishsinha2612@gmail.com,Student
2025PG03017,P B Ranjith,PGPP UI/UX,1,ranjithbadkillaya004@gmail.com,Student
2025PG03004,Roshan B,PGPP UI/UX,1,roshanromu15@gmail.com,Student
2025PG03011,Shabil Muhammed M S,PGPP UI/UX,1,shabilmuhammed137@gmail.com,Student
2025PG03020,Snehashree S G,PGPP UI/UX,1,snehashreesg15@gmail.com,Student
2025PG03018,SREYA.K.N,PGPP UI/UX,1,knsreya@gmail.com,Student
2025PG03019,VRUNDHA R,PGPP UI/UX,1,vrundhar7@gmail.com,Student
2025PG03022,NEHAD T,PGPP UI/UX,1,nehadt838@gmail.com,Student
2024MSC06030,Adam Clyde Gonsalves ,MSc Game Technology,1,gonsalvesadam62@gmail.com,Student
2024MSC06050,Adithya Premjith ,MSc Game Technology,1,adithyapremjith2002@gmail.com,Student
2024MSC06042,Aniket Sudarshan Mate,MSc Game Technology,1,amate647@gmail.com,Student
2024MSC06047,Athul jo,MSc Game Technology,1,athuljobaji@gmail.com,Student
2024MSC06005,ATHUL K M,MSc Game Technology,1,athulashokan03@gmail.com,Student
2024MSC06004,AYAAN KHAN,MSc Game Technology,1,ayaankhan1363@gmail.com,Student
2024MSC06025,Jnana Prabhavana V R,MSc Game Technology,1,Jnanaprabhava10@gmail.com,Student
2024MSC06019,Maheesh Sadanandan ,MSc Game Technology,1,maheeshsadanandan13@gmail.com,Student
2024MSC06007,Naveen E,MSc Game Technology,1,Naveen.e4593@gmail.com,Student
2024MSC06027,Tharakeshwar Umanand,MSc Game Technology,1,u.tharakeshwar@gmail.com,Student
2024MSC06022,Yogeshwaran M,MSc Game Technology,1,Yogeshwaran6604@gmail.com,Student
2024MSC06024,Yuvraj M,MSc Game Technology,1,yuvrajgamedev@gmail.com,Student
2024MSC06035,ARUN KUMAR A ,MSc Multimedia,1,arunkumara20uel1004@gmail.com,Student
2024MSC06021,Blessy N ,MSc Multimedia,1,nblessy4@gmail.com,Student
2024MSC06006,FELIX XAVIER A,MSc Multimedia,1,felixxavier1821@gmail.com,Student
2024MSC06040,KOWSHIK S,MSc Multimedia,1,dkskowshik@gmail.com,Student
2024MSC06008,Nehal Mehta,MSc Multimedia,1,nehalmehtaaa@gmail.com,Student
2024MSC06003,SAAM ROSHAN A,MSc Multimedia,1,samroshan724@gmail.com,Student
2024MSC06034,THAMBALLAPLLE VENKATESH,MSc Multimedia,1,venkyvenkatesh8945@gmail.com,Student
2025MSC06008,AJAY S BABU,MSc Game Technology,2,ajbabu071@gmail.com,Student
2025MSC06023,Ganti Surya Teja,MSc Game Technology,2,ganti.teja007@gmail.com,Student
2025MSC06004,Giridharan K,MSc Game Technology,2,kasigiridhar888@gmail.com,Student
2025MSC06046,Gopika krishnan,MSc Game Technology,2,gopikakgokulam@gmail.com,Student
2025MSC06003,Guvalla Chakradhar,MSc Game Technology,2,chakradharguvalla11@gmail.com,Student
2025MSC06013,Krish barfa,MSc Game Technology,2,Krishbarfa7470@gmail.com,Student
2025MSC06007,Mayank Choudhary,MSc Game Technology,2,mayankchoudhary026@gmail.com,Student
2025MSC06037,MEGHANA T G,MSc Game Technology,2,meghanaganesh98@gmail.com,Student
2025MSC06048,Rabimon M,MSc Game Technology,2,rabimon45@gmail.com,Student
2025MSC06002,RONIT PRAKASH,MSc Game Technology,2,ronitprakash694@gmail.com,Student
2025MSC06047,Vinay Sankar V,MSc Game Technology,2,sankarvinay70@gmail.com,Student
2025MSC06032,Akash G S,MSc Multimedia,2,akashshashi0307@gmail.com,Student
2025MSC06028,Ankita Das,MSc Multimedia,2,byankieee@gmail.com,Student
2025MSC06019,Dipti Lilesh Patle,MSc Multimedia,2,diptipatle30@gmail.com,Student
2025MSC06045,Ishan Patowary,MSc Multimedia,2,ishaanpatowary9@gmail.com,Student
2025MSC06009,Nelson Jefrin Xavier C,MSc Multimedia,2,charlesjefrin19njx@gmail.com,Student
2025MSC06028,Ankita Das,MSc Multimedia,2,byankieee@gmail.com,Student
2025MSC06019,Dipti Lilesh Patle,MSc Multimedia,2,diptipatle30@gmail.com,Student
2025MSC06045,Ishan Patowary,MSc Multimedia,2,ishaanpatowary9@gmail.com,Student
2025MSC06009,Nelson Jefrin Xavier C,MSc Multimedia,2,charlesjefrin19njx@gmail.com,Student
2025MSC06027,Sayantan Sanyal,MSc Multimedia,2,sayantansanyalicat@gmail.com,Student
2025MSC06034,Susmitha,MSc Multimedia,2,velayuthamsusmitha@gmail.com,Student`;

export const parseUsers = (): User[] => {
    const users: User[] = [];

    // Parse Faculty
    const facultyLines = FACULTY_CSV.split('\n');
    for (let i = 1; i < facultyLines.length; i++) {
        const line = facultyLines[i].trim();
        if (!line) continue;
        const cols = line.split(',');
        if (cols.length < 5) continue;
        
        let roleVal = cols[4].trim();
        // Rebranding mapping for static CSV source
        if (roleVal === 'System Administrator') {
            roleVal = Role.SystemAdministrator; // 'System manager'
        }

        let password = cols[0].trim();
        if (cols[3].trim() === 'lakshmi.k@icat.ac.in') {
            password = 'DEAN@123';
        }

        users.push({
            id: cols[0].trim(),
            name: cols[1].trim(),
            email: cols[3].trim().toLowerCase(),
            role: roleVal as Role, 
            programId: '',
            password: password,
            profilePicture: ''
        });
    }

    // Parse Students
    const studentLines = STUDENT_CSV.split('\n');
    for (let i = 1; i < studentLines.length; i++) {
        const line = studentLines[i].trim();
        if (!line) continue;
        const cols = line.split(',');
        if (cols.length < 6) continue;
        
        // Handle special mapping for PGPP -> PGD
        let progId = cols[2].trim();
        if (progId.includes('PGPP')) progId = progId.replace('PGPP', 'PGD');

        users.push({
            id: cols[0].trim(),
            name: cols[1].trim(),
            email: cols[4].trim().toLowerCase(),
            role: cols[5].trim() as Role,
            programId: progId,
            year: parseInt(cols[3].trim()),
            password: cols[0].trim(),
            profilePicture: ''
        });
    }

    // Deduplicate users by email to prevent React key collision warnings
    const uniqueUsers: User[] = [];
    const seenEmails = new Set<string>();
    for (const u of users) {
        if (!seenEmails.has(u.email)) {
            uniqueUsers.push(u);
            seenEmails.add(u.email);
        }
    }

    return uniqueUsers;
};
