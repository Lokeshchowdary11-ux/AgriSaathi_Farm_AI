export interface VillageInfo {
  name: string;
  pincode: string;
}

export interface MandalInfo {
  name: string;
  villages: VillageInfo[];
}

export interface DistrictInfo {
  name: string;
  mandals: MandalInfo[];
}

export interface StateInfo {
  name: string;
  districts: DistrictInfo[];
}

export const locationHierarchy: StateInfo[] = [
  {
    name: "Andhra Pradesh",
    districts: [
      {
        name: "Guntur",
        mandals: [
          {
            name: "Pedakakani",
            villages: [
              { name: "Pedakakani", pincode: "522509" },
              { name: "Ananthavarappadu", pincode: "522509" },
              { name: "Devarapalli", pincode: "522509" },
              { name: "Namburu", pincode: "522508" },
              { name: "Takkellapadu", pincode: "522509" },
              { name: "Koppuravuru", pincode: "522509" },
              { name: "Agatavarappadu", pincode: "522509" }
            ]
          },
          {
            name: "Tenali",
            villages: [
              { name: "Angalakuduru", pincode: "522211" },
              { name: "Chinaravuru", pincode: "522201" },
              { name: "Pedaravuru", pincode: "522201" },
              { name: "Pinapadu", pincode: "522201" },
              { name: "Kandula", pincode: "522211" },
              { name: "Kolakaluru", pincode: "522213" },
              { name: "Nandivelugu", pincode: "522212" }
            ]
          },
          {
            name: "Mangalagiri",
            villages: [
              { name: "Atmakuru", pincode: "522503" },
              { name: "Kuragallu", pincode: "522503" },
              { name: "Nidamarru", pincode: "522503" },
              { name: "Nowlur", pincode: "522503" },
              { name: "Nutakki", pincode: "522503" },
              { name: "Chinakakani", pincode: "522503" },
              { name: "Kaza", pincode: "522503" }
            ]
          },
          {
            name: "Thullur",
            villages: [
              { name: "Ainavolu", pincode: "522237" },
              { name: "Ananthavaram", pincode: "522237" },
              { name: "Borupalem", pincode: "522237" },
              { name: "Dondapadu", pincode: "522237" },
              { name: "Mandadam", pincode: "522237" },
              { name: "Nelapadu", pincode: "522237" },
              { name: "Thullur", pincode: "522237" },
              { name: "Uddandarayunipalem", pincode: "522237" },
              { name: "Lingayapalem", pincode: "522237" }
            ]
          },
          {
            name: "Tadikonda",
            villages: [
              { name: "Tadikonda", pincode: "522236" },
              { name: "Kantheru", pincode: "522236" },
              { name: "Lalam", pincode: "522236" },
              { name: "Ponnekallu", pincode: "522236" },
              { name: "Nidamarrru", pincode: "522236" }
            ]
          },
          {
            name: "Ponnur",
            villages: [
              { name: "Ponnur", pincode: "522124" },
              { name: "Mulukuduru", pincode: "522124" },
              { name: "Nidubrolu", pincode: "522124" },
              { name: "Vandanam", pincode: "522124" },
              { name: "Jagalamudi", pincode: "522124" }
            ]
          },
          {
            name: "Chebrole",
            villages: [
              { name: "Chebrole", pincode: "522212" },
              { name: "Gundavaram", pincode: "522212" },
              { name: "Godavarru", pincode: "522212" },
              { name: "Pathareddypalem", pincode: "522212" },
              { name: "Vejendla", pincode: "522213" }
            ]
          },
          {
            name: "Medonduru",
            villages: [
              { name: "Medonduru", pincode: "522438" },
              { name: "Perecherla", pincode: "522009" },
              { name: "Siripuram", pincode: "522438" },
              { name: "Veliveru", pincode: "522438" }
            ]
          },
          {
            name: "Prathipadu",
            villages: [
              { name: "Prathipadu", pincode: "522019" },
              { name: "Gottipadu", pincode: "522019" },
              { name: "Koyavaripalem", pincode: "522019" },
              { name: "Kondepadu", pincode: "522019" },
              { name: "Mallayapalem", pincode: "522019" }
            ]
          },
          {
            name: "Vatticherukuru",
            villages: [
              { name: "Vatticherukuru", pincode: "522212" },
              { name: "Chamallamudi", pincode: "522212" },
              { name: "Kornepadu", pincode: "522212" },
              { name: "Lemalle", pincode: "522212" },
              { name: "Mutluru", pincode: "522212" }
            ]
          },
          {
            name: "Guntur Urban / East / West",
            villages: [
              { name: "Guntur Town", pincode: "522002" },
              { name: "Gorantla", pincode: "522034" },
              { name: "Nallapadu", pincode: "522005" },
              { name: "Budampadu", pincode: "522017" },
              { name: "Pedapalakaluru", pincode: "522009" }
            ]
          }
        ]
      },
      {
        name: "Palnadu",
        mandals: [
          {
            name: "Narasaraopet",
            villages: [
              { name: "Narasaraopet", pincode: "522601" },
              { name: "Jonnalagadda", pincode: "522601" },
              { name: "Kotappakonda", pincode: "522601" },
              { name: "Kesanupalli", pincode: "522601" },
              { name: "Mulakaluru", pincode: "522601" }
            ]
          },
          {
            name: "Sattenapalle",
            villages: [
              { name: "Sattenapalle", pincode: "522403" },
              { name: "Dhoolipalla", pincode: "522403" },
              { name: "Gorantla", pincode: "522403" },
              { name: "Gudipudi", pincode: "522403" },
              { name: "Kantenavari Palem", pincode: "522403" }
            ]
          },
          {
            name: "Gurazala",
            villages: [
              { name: "Gurazala", pincode: "522415" },
              { name: "Daida", pincode: "522415" },
              { name: "Ganga Varam", pincode: "522415" },
              { name: "Madugula", pincode: "522415" }
            ]
          },
          {
            name: "Macherla",
            villages: [
              { name: "Macherla", pincode: "522426" },
              { name: "Koppunoor", pincode: "522426" },
              { name: "Nagaidupalle", pincode: "522426" },
              { name: "Rentachintala", pincode: "522421" }
            ]
          },
          {
            name: "Piduguralla",
            villages: [
              { name: "Piduguralla", pincode: "522413" },
              { name: "Guttikonda", pincode: "522413" },
              { name: "Karalapadu", pincode: "522413" },
              { name: "Konanki", pincode: "522413" }
            ]
          },
          {
            name: "Vinukonda",
            villages: [
              { name: "Vinukonda", pincode: "522647" },
              { name: "Brahmanapalli", pincode: "522647" },
              { name: "Nuzendla", pincode: "522660" },
              { name: "Sivapuram", pincode: "522647" }
            ]
          },
          {
            name: "Chilakaluripet",
            villages: [
              { name: "Chilakaluripet", pincode: "522616" },
              { name: "Ganapavaram", pincode: "522619" },
              { name: "Kavuru", pincode: "522616" },
              { name: "Murikipudi", pincode: "522616" },
              { name: "Pasumarru", pincode: "522616" }
            ]
          },
          {
            name: "Amaravathi",
            villages: [
              { name: "Amaravathi", pincode: "522204" },
              { name: "Dharanikota", pincode: "522204" },
              { name: "Didugu", pincode: "522204" },
              { name: "Endrai", pincode: "522204" }
            ]
          },
          {
            name: "Atchampet",
            villages: [
              { name: "Atchampet", pincode: "522409" },
              { name: "Chintapalle", pincode: "522409" },
              { name: "Kastala", pincode: "522409" }
            ]
          },
          {
            name: "Krosuru",
            villages: [
              { name: "Krosuru", pincode: "522410" },
              { name: "Bayyavaram", pincode: "522410" },
              { name: "Gudipadu", pincode: "522410" }
            ]
          }
        ]
      },
      {
        name: "Bapatla",
        mandals: [
          {
            name: "Bapatla",
            villages: [
              { name: "Bapatla Town", pincode: "522101" },
              { name: "Appikatla", pincode: "522101" },
              { name: "Jillellamudi", pincode: "522113" },
              { name: "Karlapalem", pincode: "522111" },
              { name: "Poondla", pincode: "522101" }
            ]
          },
          {
            name: "Repalle",
            villages: [
              { name: "Repalle", pincode: "522265" },
              { name: "Isukapalli", pincode: "522265" },
              { name: "Peteru", pincode: "522265" },
              { name: "Penumudi", pincode: "522265" }
            ]
          },
          {
            name: "Vemuru",
            villages: [
              { name: "Vemuru", pincode: "522261" },
              { name: "Chavali", pincode: "522261" },
              { name: "Jammulapalem", pincode: "522261" },
              { name: "Penumarru", pincode: "522261" }
            ]
          },
          {
            name: "Chirala",
            villages: [
              { name: "Chirala", pincode: "523155" },
              { name: "Ithananagar", pincode: "523155" },
              { name: "Perala", pincode: "523157" },
              { name: "Vetapalem", pincode: "523187" }
            ]
          },
          {
            name: "Addanki",
            villages: [
              { name: "Addanki", pincode: "523201" },
              { name: "Dharmavaram", pincode: "523201" },
              { name: "Manikeswaram", pincode: "523201" },
              { name: "Singarakonda", pincode: "523201" }
            ]
          },
          {
            name: "Parchur",
            villages: [
              { name: "Parchur", pincode: "523169" },
              { name: "Inagallu", pincode: "523169" },
              { name: "Karamchedu", pincode: "523168" },
              { name: "Swarna", pincode: "523169" }
            ]
          },
          {
            name: "Martur",
            villages: [
              { name: "Martur", pincode: "523301" },
              { name: "Dronadula", pincode: "523301" },
              { name: "Valaparla", pincode: "523301" }
            ]
          }
        ]
      },
      {
        name: "NTR District",
        mandals: [
          {
            name: "Vijayawada Urban / Central / North",
            villages: [
              { name: "Vijayawada City", pincode: "520001" },
              { name: "Gunadala", pincode: "520004" },
              { name: "Patamata", pincode: "520010" },
              { name: "Bhavanipuram", pincode: "520012" }
            ]
          },
          {
            name: "Vijayawada Rural",
            villages: [
              { name: "Enikepadu", pincode: "521108" },
              { name: "Kankipadu", pincode: "521151" },
              { name: "Nunna", pincode: "521212" },
              { name: "Poranki", pincode: "521137" },
              { name: "Gollapudi", pincode: "521225" },
              { name: "Prodduturu", pincode: "521151" }
            ]
          },
          {
            name: "Nandigama",
            villages: [
              { name: "Nandigama", pincode: "521185" },
              { name: "Anigandlapadu", pincode: "521185" },
              { name: "Kanchala", pincode: "521185" },
              { name: "Munagacherla", pincode: "521185" }
            ]
          },
          {
            name: "Jaggayyapeta",
            villages: [
              { name: "Jaggayyapeta", pincode: "521175" },
              { name: "Annavaram", pincode: "521175" },
              { name: "Chillakallu", pincode: "521178" },
              { name: "Muktyala", pincode: "521175" }
            ]
          },
          {
            name: "Mylavaram",
            villages: [
              { name: "Mylavaram", pincode: "521230" },
              { name: "Chandragudem", pincode: "521230" },
              { name: "Ganapavaram", pincode: "521230" },
              { name: "Ponnavaram", pincode: "521230" }
            ]
          },
          {
            name: "Tiruvuru",
            villages: [
              { name: "Tiruvuru", pincode: "521235" },
              { name: "Akkapalem", pincode: "521235" },
              { name: "Ansthanagurthi", pincode: "521235" },
              { name: "Gampalagudem", pincode: "521236" }
            ]
          },
          {
            name: "Kanchikacherla",
            villages: [
              { name: "Kanchikacherla", pincode: "521180" },
              { name: "Gottumukkala", pincode: "521180" },
              { name: "Keesara", pincode: "521180" },
              { name: "Paritala", pincode: "521180" }
            ]
          }
        ]
      },
      {
        name: "Krishna",
        mandals: [
          {
            name: "Gannavaram",
            villages: [
              { name: "Gannavaram", pincode: "521101" },
              { name: "Allapuram", pincode: "521101" },
              { name: "Bapulapadu", pincode: "521105" },
              { name: "Telaprolu", pincode: "521109" },
              { name: "Purushothapatnam", pincode: "521101" },
              { name: "Mustabada", pincode: "521107" }
            ]
          },
          {
            name: "Gudivada",
            villages: [
              { name: "Gudivada", pincode: "521301" },
              { name: "Chowtapalli", pincode: "521301" },
              { name: "Mandumula", pincode: "521301" },
              { name: "Valivartipadu", pincode: "521301" },
              { name: "Mallayypalayam", pincode: "521301" }
            ]
          },
          {
            name: "Machilipatnam",
            villages: [
              { name: "Machilipatnam", pincode: "521001" },
              { name: "Chillakalapudi", pincode: "521002" },
              { name: "Pedana", pincode: "521366" },
              { name: "Tallapalem", pincode: "521001" }
            ]
          },
          {
            name: "Nuzvid",
            villages: [
              { name: "Nuzvid", pincode: "521201" },
              { name: "Hanuman Junction", pincode: "521105" },
              { name: "Morsapudi", pincode: "521201" },
              { name: "Tukkuluru", pincode: "521201" }
            ]
          },
          {
            name: "Vuyyuru",
            villages: [
              { name: "Vuyyuru", pincode: "521165" },
              { name: "Akunuru", pincode: "521165" },
              { name: "Guntupalli", pincode: "521165" },
              { name: "Katuru", pincode: "521165" }
            ]
          },
          {
            name: "Pamarru",
            villages: [
              { name: "Pamarru", pincode: "521157" },
              { name: "Anasagaram", pincode: "521157" },
              { name: "Kurumaddali", pincode: "521157" },
              { name: "Passalapudi", pincode: "521157" }
            ]
          },
          {
            name: "Challapalli",
            villages: [
              { name: "Challapalli", pincode: "521126" },
              { name: "Ghiripadu", pincode: "521126" },
              { name: "Lankapalli", pincode: "521126" },
              { name: "Yarlagadda", pincode: "521126" }
            ]
          },
          {
            name: "Avanigadda",
            villages: [
              { name: "Avanigadda", pincode: "521121" },
              { name: "Nagayalanka", pincode: "521120" },
              { name: "Koduru", pincode: "521121" },
              { name: "Puligadda", pincode: "521121" }
            ]
          }
        ]
      },
      {
        name: "Prakasam",
        mandals: [
          {
            name: "Ongole",
            villages: [
              { name: "Ongole Town", pincode: "523001" },
              { name: "Anangi", pincode: "523001" },
              { name: "Cheruvukommupalem", pincode: "523001" },
              { name: "Karavadi", pincode: "523001" },
              { name: "Mundlamuru", pincode: "523001" },
              { name: "Pelluru", pincode: "523272" }
            ]
          },
          {
            name: "Kandukur",
            villages: [
              { name: "Kandukur", pincode: "523105" },
              { name: "Ananthavaram", pincode: "523105" },
              { name: "Koguntavari Palem", pincode: "523105" },
              { name: "Machavaram", pincode: "523105" },
              { name: "Paluru", pincode: "523105" }
            ]
          },
          {
            name: "Markapur",
            villages: [
              { name: "Markapur", pincode: "523316" },
              { name: "Bommala Puram", pincode: "523316" },
              { name: "Gajjalakonda", pincode: "523316" },
              { name: "Rayavaram", pincode: "523316" }
            ]
          },
          {
            name: "Giddalur",
            villages: [
              { name: "Giddalur", pincode: "523357" },
              { name: "Ambavaram", pincode: "523357" },
              { name: "Komatipalli", pincode: "523357" },
              { name: "Sanjeeva Nagar", pincode: "523357" }
            ]
          },
          {
            name: "Podili",
            villages: [
              { name: "Podili", pincode: "523240" },
              { name: "Kakarla", pincode: "523240" },
              { name: "Katuru", pincode: "523240" },
              { name: "Nandigunta", pincode: "523240" }
            ]
          },
          {
            name: "Kanigiri",
            villages: [
              { name: "Kanigiri", pincode: "523230" },
              { name: "Balavenkatapuram", pincode: "523230" },
              { name: "Garladinne", pincode: "523230" },
              { name: "Punnuru", pincode: "523230" }
            ]
          },
          {
            name: "Chirala / Vetapalem",
            villages: [
              { name: "Chirala", pincode: "523155" },
              { name: "Epurupalem", pincode: "523155" },
              { name: "Pandillapalle", pincode: "523187" }
            ]
          }
        ]
      },
      {
        name: "Kurnool",
        mandals: [
          {
            name: "Kurnool Urban / Rural",
            villages: [
              { name: "Kurnool Town", pincode: "518001" },
              { name: "Gargeyapuram", pincode: "518002" },
              { name: "Kallur", pincode: "518003" },
              { name: "Pudur", pincode: "518002" },
              { name: "Ulchala", pincode: "518002" }
            ]
          },
          {
            name: "Adoni",
            villages: [
              { name: "Adoni", pincode: "518301" },
              { name: "Arekal", pincode: "518301" },
              { name: "Basapuram", pincode: "518301" },
              { name: "Dhana Puram", pincode: "518301" },
              { name: "Mandagiri", pincode: "518301" }
            ]
          },
          {
            name: "Yemmiganur",
            villages: [
              { name: "Yemmiganur", pincode: "518360" },
              { name: "Banavasi", pincode: "518360" },
              { name: "Kadimetla", pincode: "518360" },
              { name: "Parlapalle", pincode: "518360" }
            ]
          },
          {
            name: "Pattikonda",
            villages: [
              { name: "Pattikonda", pincode: "518380" },
              { name: "Duddi", pincode: "518380" },
              { name: "Hosur", pincode: "518380" },
              { name: "Pandikona", pincode: "518380" }
            ]
          },
          {
            name: "Kodumur",
            villages: [
              { name: "Kodumur", pincode: "518464" },
              { name: "Anugonda", pincode: "518464" },
              { name: "Ladjhara", pincode: "518464" },
              { name: "Pyapili", pincode: "518221" }
            ]
          },
          {
            name: "Alur",
            villages: [
              { name: "Alur", pincode: "518395" },
              { name: "Ariyagola", pincode: "518395" },
              { name: "Hathi Belagal", pincode: "518395" },
              { name: "Molagavalli", pincode: "518395" }
            ]
          }
        ]
      },
      {
        name: "Nandyal",
        mandals: [
          {
            name: "Nandyal",
            villages: [
              { name: "Nandyal Town", pincode: "518501" },
              { name: "Ayalur", pincode: "518501" },
              { name: "Gopavaram", pincode: "518501" },
              { name: "Kottala", pincode: "518501" },
              { name: "Moolasagaram", pincode: "518501" }
            ]
          },
          {
            name: "Allagadda",
            villages: [
              { name: "Allagadda", pincode: "518543" },
              { name: "Ahobilam", pincode: "518545" },
              { name: "Gobernatham", pincode: "518543" },
              { name: "Pedda Kandukur", pincode: "518543" }
            ]
          },
          {
            name: "Dhone",
            villages: [
              { name: "Dhone / Dronachalam", pincode: "518222" },
              { name: "Chanugondla", pincode: "518222" },
              { name: "Kocheruvu", pincode: "518222" },
              { name: "Ungaranagutta", pincode: "518222" }
            ]
          },
          {
            name: "Atmakur",
            villages: [
              { name: "Atmakur", pincode: "518583" },
              { name: "Indireswaram", pincode: "518583" },
              { name: "Karivena", pincode: "518583" },
              { name: "Srisailam Project", pincode: "518102" }
            ]
          },
          {
            name: "Banganapalle",
            villages: [
              { name: "Banganapalle", pincode: "518124" },
              { name: "Appalapuram", pincode: "518124" },
              { name: "Palukur", pincode: "518124" },
              { name: "Yaganti", pincode: "518124" }
            ]
          },
          {
            name: "Koilkuntla",
            villages: [
              { name: "Koilkuntla", pincode: "518134" },
              { name: "Kampamalla", pincode: "518134" },
              { name: "Moulalia", pincode: "518134" },
              { name: "Pedda Veedhi", pincode: "518134" }
            ]
          }
        ]
      },
      {
        name: "East Godavari",
        mandals: [
          {
            name: "Rajahmundry Urban / Rural",
            villages: [
              { name: "Rajahmundry City", pincode: "533101" },
              { name: "Bommuru", pincode: "533124" },
              { name: "Torredu", pincode: "533124" },
              { name: "Kadiyam", pincode: "533126" },
              { name: "Vemagiri", pincode: "533125" }
            ]
          },
          {
            name: "Kovvur",
            villages: [
              { name: "Kovvur", pincode: "534350" },
              { name: "Aripirala", pincode: "534350" },
              { name: "Chagallu", pincode: "534342" },
              { name: "Kumaradevam", pincode: "534350" }
            ]
          },
          {
            name: "Anaparthi",
            villages: [
              { name: "Anaparthi", pincode: "533342" },
              { name: "Duppalapudi", pincode: "533342" },
              { name: "Mahendrawada", pincode: "533342" },
              { name: "Polamuru", pincode: "533342" }
            ]
          },
          {
            name: "Nidadavole",
            villages: [
              { name: "Nidadavole", pincode: "534301" },
              { name: "Korumilli", pincode: "534301" },
              { name: "Muddapuram", pincode: "534301" },
              { name: "Samisragudem", pincode: "534301" }
            ]
          },
          {
            name: "Gokavaram",
            villages: [
              { name: "Gokavaram", pincode: "533286" },
              { name: "Achantampeta", pincode: "533286" },
              { name: "Gumpallam", pincode: "533286" },
              { name: "Tantikonda", pincode: "533286" }
            ]
          }
        ]
      },
      {
        name: "Kakinada",
        mandals: [
          {
            name: "Kakinada Urban / Rural",
            villages: [
              { name: "Kakinada City", pincode: "533001" },
              { name: "Atchutapurapatnam", pincode: "533005" },
              { name: "Sarpavaram", pincode: "533005" },
              { name: "Ramanayyapeta", pincode: "533005" },
              { name: "Vakalapudi", pincode: "533005" }
            ]
          },
          {
            name: "Samalkota",
            villages: [
              { name: "Samalkota", pincode: "533440" },
              { name: "G.Medapadu", pincode: "533440" },
              { name: "Pedabrahmadevam", pincode: "533440" },
              { name: "Vetlapalem", pincode: "533440" }
            ]
          },
          {
            name: "Pithapuram",
            villages: [
              { name: "Pithapuram", pincode: "533450" },
              { name: "Chitrada", pincode: "533450" },
              { name: "Jamulapalle", pincode: "533450" },
              { name: "Navara", pincode: "533450" }
            ]
          },
          {
            name: "Peddapuram",
            villages: [
              { name: "Peddapuram", pincode: "533437" },
              { name: "Anuru", pincode: "533437" },
              { name: "Chandramampeta", pincode: "533437" },
              { name: "Kattamuru", pincode: "533437" }
            ]
          },
          {
            name: "Tuni",
            villages: [
              { name: "Tuni", pincode: "533401" },
              { name: "Chamavaram", pincode: "533401" },
              { name: "Kollimeru", pincode: "533401" },
              { name: "Tetagunta", pincode: "533401" }
            ]
          }
        ]
      },
      {
        name: "Dr. B.R. Ambedkar Konaseema",
        mandals: [
          {
            name: "Amalapuram",
            villages: [
              { name: "Amalapuram", pincode: "533201" },
              { name: "Bandarulanka", pincode: "533221" },
              { name: "Indupalle", pincode: "533201" },
              { name: "Peruru", pincode: "533201" }
            ]
          },
          {
            name: "Razole",
            villages: [
              { name: "Razole", pincode: "533242" },
              { name: "Kandikuppa", pincode: "533242" },
              { name: "Malkipuram", pincode: "533253" },
              { name: "Sakhinetipalle", pincode: "533251" }
            ]
          },
          {
            name: "Kothapeta",
            villages: [
              { name: "Kothapeta", pincode: "533223" },
              { name: "Avidi", pincode: "533223" },
              { name: "Ganti", pincode: "533223" },
              { name: "Palivela", pincode: "533223" }
            ]
          },
          {
            name: "Ramachandrapuram",
            villages: [
              { name: "Ramachandrapuram", pincode: "533255" },
              { name: "Draksharamam", pincode: "533262" },
              { name: "Oduru", pincode: "533255" },
              { name: "Vella", pincode: "533255" }
            ]
          }
        ]
      },
      {
        name: "West Godavari",
        mandals: [
          {
            name: "Bhimavaram",
            villages: [
              { name: "Bhimavaram Town", pincode: "534201" },
              { name: "Gollalakoderu", pincode: "534201" },
              { name: "Rayalam", pincode: "534208" },
              { name: "Annavaram", pincode: "534201" },
              { name: "Tundurru", pincode: "534201" }
            ]
          },
          {
            name: "Tadepalligudem",
            villages: [
              { name: "Tadepalligudem", pincode: "534101" },
              { name: "Arulla", pincode: "534101" },
              { name: "Kadiyadda", pincode: "534101" },
              { name: "Pentapadu", pincode: "534166" }
            ]
          },
          {
            name: "Tanuku",
            villages: [
              { name: "Tanuku", pincode: "534211" },
              { name: "Duvva", pincode: "534211" },
              { name: "Mandapaka", pincode: "534211" },
              { name: "Tetali", pincode: "534211" }
            ]
          },
          {
            name: "Narasapuram",
            villages: [
              { name: "Narasapuram", pincode: "534275" },
              { name: "Likhithapudi", pincode: "534275" },
              { name: "Navabpalem", pincode: "534275" },
              { name: "Rustumbada", pincode: "534275" }
            ]
          },
          {
            name: "Palakollu",
            villages: [
              { name: "Palakollu", pincode: "534260" },
              { name: "Gorintada", pincode: "534260" },
              { name: "Poolapalli", pincode: "534260" },
              { name: "Ullamparru", pincode: "534260" }
            ]
          }
        ]
      },
      {
        name: "Eluru",
        mandals: [
          {
            name: "Eluru",
            villages: [
              { name: "Eluru Town", pincode: "534001" },
              { name: "Sanivarapupeta", pincode: "534003" },
              { name: "Tangellamudi", pincode: "534005" },
              { name: "Vatloor", pincode: "534007" },
              { name: "Komadapalle", pincode: "534001" }
            ]
          },
          {
            name: "Jangareddigudem",
            villages: [
              { name: "Jangareddigudem", pincode: "534447" },
              { name: "Devulapalli", pincode: "534447" },
              { name: "Gokavaram", pincode: "534447" },
              { name: "Pattiseema", pincode: "534438" }
            ]
          },
          {
            name: "Chintalapudi",
            villages: [
              { name: "Chintalapudi", pincode: "534460" },
              { name: "Fathepuram", pincode: "534460" },
              { name: "Raghavapuram", pincode: "534460" },
              { name: "Uruturu", pincode: "534460" }
            ]
          },
          {
            name: "Nuzvid / Musunuru",
            villages: [
              { name: "Musunuru", pincode: "521207" },
              { name: "Balive", pincode: "521207" },
              { name: "Gopavaram", pincode: "521207" }
            ]
          }
        ]
      },
      {
        name: "Anantapur",
        mandals: [
          {
            name: "Anantapur Urban / Rural",
            villages: [
              { name: "Anantapur Town", pincode: "515001" },
              { name: "Alamuru", pincode: "515002" },
              { name: "Garladinne", pincode: "515731" },
              { name: "Itikalapalli", pincode: "515002" },
              { name: "Kudair", pincode: "515711" }
            ]
          },
          {
            name: "Guntakal",
            villages: [
              { name: "Guntakal", pincode: "515801" },
              { name: "Donda Padu", pincode: "515801" },
              { name: "Kasapuram", pincode: "515803" },
              { name: "Nettikanti", pincode: "515803" }
            ]
          },
          {
            name: "Tadpatri",
            villages: [
              { name: "Tadpatri", pincode: "515411" },
              { name: "Bhogasamudram", pincode: "515411" },
              { name: "Chinna Yekkaluru", pincode: "515411" },
              { name: "Sajjaladinne", pincode: "515411" }
            ]
          },
          {
            name: "Rayadurg",
            villages: [
              { name: "Rayadurg", pincode: "515865" },
              { name: "Avuladatla", pincode: "515865" },
              { name: "Gramadatla", pincode: "515865" },
              { name: "Kanekal", pincode: "515871" }
            ]
          },
          {
            name: "Uravakonda",
            villages: [
              { name: "Uravakonda", pincode: "515812" },
              { name: "Aravakur", pincode: "515812" },
              { name: "Indravathi", pincode: "515812" },
              { name: "Palyam", pincode: "515812" }
            ]
          }
        ]
      },
      {
        name: "Sri Sathya Sai",
        mandals: [
          {
            name: "Puttaparthi",
            villages: [
              { name: "Puttaparthi Town", pincode: "515134" },
              { name: "Buchenahalli", pincode: "515134" },
              { name: "Kothacheruvu", pincode: "515133" },
              { name: "Narpala", pincode: "515425" }
            ]
          },
          {
            name: "Dharmavaram",
            villages: [
              { name: "Dharmavaram", pincode: "515671" },
              { name: "Gotkur", pincode: "515671" },
              { name: "Kunuthuru", pincode: "515671" },
              { name: "Maddelacheruvu", pincode: "515671" }
            ]
          },
          {
            name: "Hindupur",
            villages: [
              { name: "Hindupur", pincode: "515201" },
              { name: "Kodigenahalli", pincode: "515212" },
              { name: "Kotipi", pincode: "515211" },
              { name: "Parigi", pincode: "515212" }
            ]
          },
          {
            name: "Kadiri",
            villages: [
              { name: "Kadiri", pincode: "515591" },
              { name: "Alampur", pincode: "515591" },
              { name: "Kutagulla", pincode: "515591" },
              { name: "Muthuntla", pincode: "515591" }
            ]
          },
          {
            name: "Penukonda",
            villages: [
              { name: "Penukonda", pincode: "515110" },
              { name: "Gondipalli", pincode: "515110" },
              { name: "Maddagiri", pincode: "515110" },
              { name: "Roduam", pincode: "515124" }
            ]
          }
        ]
      },
      {
        name: "Chittoor",
        mandals: [
          {
            name: "Chittoor Urban / Rural",
            villages: [
              { name: "Chittoor Town", pincode: "517001" },
              { name: "Gudipala", pincode: "517132" },
              { name: "Kanamapalle", pincode: "517001" },
              { name: "Mapakshi", pincode: "517002" },
              { name: "Perumallapalle", pincode: "517001" }
            ]
          },
          {
            name: "Nagari",
            villages: [
              { name: "Nagari", pincode: "517590" },
              { name: "Ekambarakuppam", pincode: "517592" },
              { name: "Nindra", pincode: "517591" },
              { name: "Vijayapuram", pincode: "517590" }
            ]
          },
          {
            name: "Palamaner",
            villages: [
              { name: "Palamaner", pincode: "517408" },
              { name: "Gagillam", pincode: "517408" },
              { name: "Jagalapalle", pincode: "517408" },
              { name: "Kolipakkam", pincode: "517408" }
            ]
          },
          {
            name: "Kuppam",
            villages: [
              { name: "Kuppam", pincode: "517425" },
              { name: "Gudupalle", pincode: "517425" },
              { name: "Peddaurani", pincode: "517425" },
              { name: "Rallabuduguru", pincode: "517425" }
            ]
          },
          {
            name: "Punganur",
            villages: [
              { name: "Punganur", pincode: "517247" },
              { name: "Etavakili", pincode: "517247" },
              { name: "Kummaragunta", pincode: "517247" },
              { name: "Mangalam", pincode: "517247" }
            ]
          }
        ]
      },
      {
        name: "Tirupati",
        mandals: [
          {
            name: "Tirupati Urban / Rural",
            villages: [
              { name: "Tirupati City", pincode: "517501" },
              { name: "Chandragiri", pincode: "517101" },
              { name: "Peruru", pincode: "517507" },
              { name: "Avilala", pincode: "517507" },
              { name: "Tiruchanur", pincode: "517503" },
              { name: "Renigunta", pincode: "517520" }
            ]
          },
          {
            name: "Srikalahasti",
            villages: [
              { name: "Srikalahasti", pincode: "517644" },
              { name: "Cherukuvaripalli", pincode: "517644" },
              { name: "Kottapalam", pincode: "517644" },
              { name: "Uranduru", pincode: "517644" }
            ]
          },
          {
            name: "Gudur",
            villages: [
              { name: "Gudur", pincode: "524101" },
              { name: "Chennur", pincode: "524101" },
              { name: "Konderu", pincode: "524101" },
              { name: "Vendodu", pincode: "524101" }
            ]
          },
          {
            name: "Sullurpeta",
            villages: [
              { name: "Sullurpeta", pincode: "524121" },
              { name: "Atakanitippa", pincode: "524121" },
              { name: "Kudiri", pincode: "524121" },
              { name: "Sriharikota", pincode: "524124" }
            ]
          },
          {
            name: "Satyavedu",
            villages: [
              { name: "Satyavedu", pincode: "517588" },
              { name: "Dasukuppam", pincode: "517588" },
              { name: "Kadur", pincode: "517588" },
              { name: "Madanambedu", pincode: "517588" }
            ]
          }
        ]
      },
      {
        name: "Annamayya",
        mandals: [
          {
            name: "Madanapalle",
            villages: [
              { name: "Madanapalle", pincode: "517325" },
              { name: "Basinikonda", pincode: "517325" },
              { name: "Ponnetipalle", pincode: "517325" },
              { name: "Ankisettipalle", pincode: "517325" }
            ]
          },
          {
            name: "Rajampet",
            villages: [
              { name: "Rajampet", pincode: "516115" },
              { name: "Boyerpalle", pincode: "516115" },
              { name: "Hastavaram", pincode: "516115" },
              { name: "Tallapaka", pincode: "516115" }
            ]
          },
          {
            name: "Rayachoti",
            villages: [
              { name: "Rayachoti", pincode: "516269" },
              { name: "Gorlamudiveedu", pincode: "516269" },
              { name: "Masapet", pincode: "516269" },
              { name: "Pemmadapalle", pincode: "516269" }
            ]
          },
          {
            name: "Pileru",
            villages: [
              { name: "Pileru", pincode: "517214" },
              { name: "Agraharam", pincode: "517214" },
              { name: "Bodumalluvaripalle", pincode: "517214" },
              { name: "Mungilipattu", pincode: "517214" }
            ]
          }
        ]
      },
      {
        name: "YSR Kadapa",
        mandals: [
          {
            name: "Kadapa Urban / Rural",
            villages: [
              { name: "Kadapa City", pincode: "516001" },
              { name: "Buggaletipalli", pincode: "516003" },
              { name: "C.K. Dinne", pincode: "516003" },
              { name: "Patha Cuddapah", pincode: "516002" },
              { name: "Ramanjaneyapuram", pincode: "516001" }
            ]
          },
          {
            name: "Proddatur",
            villages: [
              { name: "Proddatur", pincode: "516360" },
              { name: "Bollavaram", pincode: "516360" },
              { name: "Dorasanipalle", pincode: "516360" },
              { name: "Koramrapalle", pincode: "516360" }
            ]
          },
          {
            name: "Pulivendula",
            villages: [
              { name: "Pulivendula", pincode: "516390" },
              { name: "Ahobilapuram", pincode: "516390" },
              { name: "Idupulapaya", pincode: "516339" },
              { name: "Karakathotapalle", pincode: "516390" },
              { name: "Vempalli", pincode: "516321" }
            ]
          },
          {
            name: "Jammalamadugu",
            villages: [
              { name: "Jammalamadugu", pincode: "516434" },
              { name: "Gandikota", pincode: "516434" },
              { name: "Moragudi", pincode: "516434" },
              { name: "Ponnathota", pincode: "516434" }
            ]
          },
          {
            name: "Badvel",
            villages: [
              { name: "Badvel", pincode: "516227" },
              { name: "Anantharajupet", pincode: "516227" },
              { name: "Lankamala", pincode: "516227" },
              { name: "Vengamambapuram", pincode: "516227" }
            ]
          }
        ]
      },
      {
        name: "SPSR Nellore",
        mandals: [
          {
            name: "Nellore Urban / Rural",
            villages: [
              { name: "Nellore City", pincode: "524001" },
              { name: "Allipuram", pincode: "524002" },
              { name: "Kovur", pincode: "524137" },
              { name: "South Mopuru", pincode: "524002" },
              { name: "Buja Buja Nellore", pincode: "524004" }
            ]
          },
          {
            name: "Kavali",
            villages: [
              { name: "Kavali", pincode: "524201" },
              { name: "Gowravaram", pincode: "524201" },
              { name: "Musunuru", pincode: "524201" },
              { name: "Rudrakota", pincode: "524201" }
            ]
          },
          {
            name: "Atmakur",
            villages: [
              { name: "Atmakur", pincode: "524322" },
              { name: "Aralagada", pincode: "524322" },
              { name: "Battepadu", pincode: "524322" },
              { name: "Karimaddela", pincode: "524322" }
            ]
          },
          {
            name: "Venkatagiri",
            villages: [
              { name: "Venkatagiri", pincode: "524132" },
              { name: "Bangaarupet", pincode: "524132" },
              { name: "Manubolu", pincode: "524405" },
              { name: "Yatlakuru", pincode: "524132" }
            ]
          }
        ]
      },
      {
        name: "Visakhapatnam",
        mandals: [
          {
            name: "Visakhapatnam Urban / Bheemunipatnam",
            villages: [
              { name: "Vizag City", pincode: "530001" },
              { name: "Bheemunipatnam (Bheemili)", pincode: "531163" },
              { name: "Pendurthi", pincode: "531173" },
              { name: "Gajuwaka", pincode: "530026" },
              { name: "Anandapuram", pincode: "530052" }
            ]
          },
          {
            name: "Anakapalle",
            villages: [
              { name: "Anakapalle", pincode: "531001" },
              { name: "Kasimkota", pincode: "531031" },
              { name: "Sankaram", pincode: "531001" },
              { name: "Thotada", pincode: "531001" }
            ]
          }
        ]
      },
      {
        name: "Anakapalli",
        mandals: [
          {
            name: "Anakapalli",
            villages: [
              { name: "Anakapalli Town", pincode: "531001" },
              { name: "Kasimkota", pincode: "531031" },
              { name: "Munagapaka", pincode: "531002" },
              { name: "Shutakonda", pincode: "531001" }
            ]
          },
          {
            name: "Elamanchili",
            villages: [
              { name: "Elamanchili", pincode: "531055" },
              { name: "Atchutapuram", pincode: "531011" },
              { name: "Rambilli", pincode: "531011" }
            ]
          },
          {
            name: "Chodavaram",
            villages: [
              { name: "Chodavaram", pincode: "531036" },
              { name: "Govada", pincode: "531036" },
              { name: "K.Kotapadu", pincode: "531034" }
            ]
          }
        ]
      },
      {
        name: "Vizianagaram",
        mandals: [
          {
            name: "Vizianagaram",
            villages: [
              { name: "Vizianagaram Town", pincode: "535001" },
              { name: "Gajapathinagaram", pincode: "535270" },
              { name: "Gantyada", pincode: "535215" },
              { name: "Nellimarla", pincode: "535217" }
            ]
          },
          {
            name: "Bobbili",
            villages: [
              { name: "Bobbili", pincode: "535558" },
              { name: "Alajangi", pincode: "535558" },
              { name: "Piridi", pincode: "535558" }
            ]
          },
          {
            name: "Cheepurupalle",
            villages: [
              { name: "Cheepurupalle", pincode: "535128" },
              { name: "Garividi", pincode: "535101" },
              { name: "Metpalle", pincode: "535128" }
            ]
          }
        ]
      },
      {
        name: "Srikakulam",
        mandals: [
          {
            name: "Srikakulam",
            villages: [
              { name: "Srikakulam Town", pincode: "532001" },
              { name: "Arasavilli", pincode: "532001" },
              { name: "Gara", pincode: "532405" },
              { name: "Kalingapatnam", pincode: "532406" }
            ]
          },
          {
            name: "Tekkali",
            villages: [
              { name: "Tekkali", pincode: "532201" },
              { name: "Nandigam", pincode: "532204" },
              { name: "Ravivalasa", pincode: "532201" }
            ]
          },
          {
            name: "Palasa",
            villages: [
              { name: "Palasa", pincode: "532221" },
              { name: "Kasibugga", pincode: "532222" },
              { name: "Mogilipadu", pincode: "532221" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Telangana",
    districts: [
      {
        name: "Warangal",
        mandals: [
          {
            name: "Warangal Urban / Rural",
            villages: [
              { name: "Warangal City", pincode: "506002" },
              { name: "Deshaipet", pincode: "506006" },
              { name: "Geesugonda", pincode: "506330" },
              { name: "Mamnoor", pincode: "506166" }
            ]
          },
          {
            name: "Narsampet",
            villages: [
              { name: "Narsampet", pincode: "506132" },
              { name: "Chennaraopet", pincode: "506132" },
              { name: "Maheshwaram", pincode: "506132" },
              { name: "Laknepally", pincode: "506132" }
            ]
          },
          {
            name: "Wardhannapet",
            villages: [
              { name: "Wardhannapet", pincode: "506313" },
              { name: "Divitipally", pincode: "506313" },
              { name: "Katrapally", pincode: "506313" }
            ]
          }
        ]
      },
      {
        name: "Hanumakonda",
        mandals: [
          {
            name: "Hanumakonda",
            villages: [
              { name: "Hanumakonda City", pincode: "506001" },
              { name: "Gopalpur", pincode: "506001" },
              { name: "Unikicherla", pincode: "506001" },
              { name: "Peddapalli", pincode: "506001" },
              { name: "Kazipet", pincode: "506003" }
            ]
          },
          {
            name: "Hasanparthy",
            villages: [
              { name: "Hasanparthy", pincode: "506015" },
              { name: "Ananthasagar", pincode: "506015" },
              { name: "Devannapet", pincode: "506015" },
              { name: "Pegadapally", pincode: "506015" }
            ]
          },
          {
            name: "Parkal",
            villages: [
              { name: "Parkal", pincode: "506164" },
              { name: "Lachmapeth", pincode: "506164" },
              { name: "Nagaram", pincode: "506164" }
            ]
          }
        ]
      },
      {
        name: "Nizamabad",
        mandals: [
          {
            name: "Nizamabad Urban / Rural",
            villages: [
              { name: "Nizamabad City", pincode: "503001" },
              { name: "Dichpally", pincode: "503175" },
              { name: "Ghanpur", pincode: "503003" },
              { name: "Mupkal", pincode: "503218" }
            ]
          },
          {
            name: "Armoor",
            villages: [
              { name: "Armoor", pincode: "503224" },
              { name: "Ankapur", pincode: "503224" },
              { name: "Perkit", pincode: "503224" },
              { name: "Bardipur", pincode: "503224" },
              { name: "Issapally", pincode: "503224" }
            ]
          },
          {
            name: "Bodhan",
            villages: [
              { name: "Bodhan", pincode: "503185" },
              { name: "Salura", pincode: "503185" },
              { name: "Erajpally", pincode: "503185" },
              { name: "Ranjole", pincode: "503185" }
            ]
          },
          {
            name: "Balkonda",
            villages: [
              { name: "Balkonda", pincode: "503217" },
              { name: "Chittapur", pincode: "503217" },
              { name: "Kishanpet", pincode: "503217" }
            ]
          }
        ]
      },
      {
        name: "Karimnagar",
        mandals: [
          {
            name: "Karimnagar Urban / Rural",
            villages: [
              { name: "Karimnagar City", pincode: "505001" },
              { name: "Bommakal", pincode: "505001" },
              { name: "Durshed", pincode: "505001" },
              { name: "Elgandal", pincode: "505401" }
            ]
          },
          {
            name: "Huzurabad",
            villages: [
              { name: "Huzurabad", pincode: "505468" },
              { name: "Bornapalli", pincode: "505468" },
              { name: "Jammikunta", pincode: "505122" },
              { name: "Kandugula", pincode: "505468" }
            ]
          },
          {
            name: "Choppadandi",
            villages: [
              { name: "Choppadandi", pincode: "505415" },
              { name: "Gumlapur", pincode: "505415" },
              { name: "Arnakonda", pincode: "505415" },
              { name: "Vedurugatta", pincode: "505415" }
            ]
          },
          {
            name: "Manakondur",
            villages: [
              { name: "Manakondur", pincode: "505505" },
              { name: "Gattududdenapalli", pincode: "505505" },
              { name: "LMD Colony", pincode: "505505" }
            ]
          }
        ]
      },
      {
        name: "Khammam",
        mandals: [
          {
            name: "Khammam Urban / Rural",
            villages: [
              { name: "Khammam City", pincode: "507001" },
              { name: "Khanapuram", pincode: "507002" },
              { name: "Mallemadugu", pincode: "507003" },
              { name: "Polepally", pincode: "507001" }
            ]
          },
          {
            name: "Wyra",
            villages: [
              { name: "Wyra", pincode: "507165" },
              { name: "Asthanagurthi", pincode: "507165" },
              { name: "Somavaram", pincode: "507165" },
              { name: "Vepakuntla", pincode: "507165" }
            ]
          },
          {
            name: "Sathupalli",
            villages: [
              { name: "Sathupalli", pincode: "507303" },
              { name: "Kistaram", pincode: "507303" },
              { name: "Vepalagadda", pincode: "507303" },
              { name: "Kakarlapalli", pincode: "507303" }
            ]
          },
          {
            name: "Madhira",
            villages: [
              { name: "Madhira", pincode: "507168" },
              { name: "Dendukuru", pincode: "507168" },
              { name: "Matoor", pincode: "507168" }
            ]
          }
        ]
      },
      {
        name: "Nalgonda",
        mandals: [
          {
            name: "Nalgonda Urban / Rural",
            villages: [
              { name: "Nalgonda Town", pincode: "508001" },
              { name: "Cherlapally", pincode: "508001" },
              { name: "Kanagal", pincode: "508004" },
              { name: "Marriguda", pincode: "508001" }
            ]
          },
          {
            name: "Miryalaguda",
            villages: [
              { name: "Miryalaguda", pincode: "508207" },
              { name: "Tungapadu", pincode: "508207" },
              { name: "Vemulapally", pincode: "508217" },
              { name: "Gudipadu", pincode: "508207" }
            ]
          },
          {
            name: "Nakerakal",
            villages: [
              { name: "Nakerakal", pincode: "508211" },
              { name: "Chityala", pincode: "508114" },
              { name: "Kattangoor", pincode: "508205" }
            ]
          },
          {
            name: "Devarakonda",
            villages: [
              { name: "Devarakonda", pincode: "508248" },
              { name: "Chintapally", pincode: "508250" },
              { name: "Gundlapally", pincode: "508248" }
            ]
          }
        ]
      },
      {
        name: "Suryapet",
        mandals: [
          {
            name: "Suryapet",
            villages: [
              { name: "Suryapet Town", pincode: "508213" },
              { name: "Imampet", pincode: "508213" },
              { name: "Kudakuda", pincode: "508213" },
              { name: "Pinnaipalem", pincode: "508213" }
            ]
          },
          {
            name: "Kodad",
            villages: [
              { name: "Kodad", pincode: "508206" },
              { name: "Akupamula", pincode: "508206" },
              { name: "Gudur", pincode: "508206" },
              { name: "Komarabanda", pincode: "508206" }
            ]
          },
          {
            name: "Huzurnagar",
            villages: [
              { name: "Huzurnagar", pincode: "508204" },
              { name: "Lakkavaram", pincode: "508204" },
              { name: "Mellachervu", pincode: "508246" }
            ]
          }
        ]
      },
      {
        name: "Mahabubnagar",
        mandals: [
          {
            name: "Mahabubnagar",
            villages: [
              { name: "Mahabubnagar Town", pincode: "509001" },
              { name: "Bhoothpur", pincode: "509382" },
              { name: "Dharma Puram", pincode: "509001" },
              { name: "Yenugonda", pincode: "509001" }
            ]
          },
          {
            name: "Jadcherla",
            villages: [
              { name: "Jadcherla", pincode: "509301" },
              { name: "Badepalle", pincode: "509301" },
              { name: "Macharam", pincode: "509301" },
              { name: "Polepally", pincode: "509301" }
            ]
          },
          {
            name: "Devarkadra",
            villages: [
              { name: "Devarkadra", pincode: "509204" },
              { name: "Chowdarpally", pincode: "509204" },
              { name: "Koyilconda", pincode: "509371" }
            ]
          }
        ]
      },
      {
        name: "Siddipet",
        mandals: [
          {
            name: "Siddipet",
            villages: [
              { name: "Siddipet Town", pincode: "502103" },
              { name: "Ensanpally", pincode: "502103" },
              { name: "Gajwel", pincode: "502278" },
              { name: "Mittapally", pincode: "502103" }
            ]
          },
          {
            name: "Gajwel",
            villages: [
              { name: "Gajwel", pincode: "502278" },
              { name: "Erravelli", pincode: "502278" },
              { name: "Jagdevpur", pincode: "502281" },
              { name: "Mulugu", pincode: "502279" }
            ]
          },
          {
            name: "Husnabad",
            villages: [
              { name: "Husnabad", pincode: "505467" },
              { name: "Akkannapet", pincode: "505467" },
              { name: "Koheda", pincode: "505471" }
            ]
          }
        ]
      },
      {
        name: "Sangareddy",
        mandals: [
          {
            name: "Sangareddy",
            villages: [
              { name: "Sangareddy Town", pincode: "502001" },
              { name: "Kandi", pincode: "502285" },
              { name: "Pothireddypally", pincode: "502001" },
              { name: "Zaheerabad", pincode: "502220" }
            ]
          },
          {
            name: "Zaheerabad",
            villages: [
              { name: "Zaheerabad", pincode: "502220" },
              { name: "Kohir", pincode: "502210" },
              { name: "Mogudampally", pincode: "502220" }
            ]
          },
          {
            name: "Patancheru",
            villages: [
              { name: "Patancheru", pincode: "502319" },
              { name: "Ameenpur", pincode: "502032" },
              { name: "Beeramguda", pincode: "502032" },
              { name: "Isnapoor", pincode: "502307" }
            ]
          }
        ]
      },
      {
        name: "Medak",
        mandals: [
          {
            name: "Medak",
            villages: [
              { name: "Medak Town", pincode: "502110" },
              { name: "Haveli Ghanpur", pincode: "502110" },
              { name: "Kuchanpally", pincode: "502110" },
              { name: "Pillutla", pincode: "502110" }
            ]
          },
          {
            name: "Narsapur",
            villages: [
              { name: "Narsapur", pincode: "502313" },
              { name: "Jinnaram", pincode: "502319" },
              { name: "Shivampet", pincode: "502313" }
            ]
          }
        ]
      },
      {
        name: "Adilabad",
        mandals: [
          {
            name: "Adilabad",
            villages: [
              { name: "Adilabad Town", pincode: "504001" },
              { name: "Bela", pincode: "504309" },
              { name: "Jainath", pincode: "504309" },
              { name: "Mavala", pincode: "504001" }
            ]
          },
          {
            name: "Utnoor",
            villages: [
              { name: "Utnoor", pincode: "504311" },
              { name: "Indervelly", pincode: "504311" },
              { name: "Narnoor", pincode: "504311" }
            ]
          }
        ]
      },
      {
        name: "Mancherial",
        mandals: [
          {
            name: "Mancherial",
            villages: [
              { name: "Mancherial Town", pincode: "504208" },
              { name: "Bellampalle", pincode: "504251" },
              { name: "Chennur", pincode: "504201" },
              { name: "Luxettipet", pincode: "504215" }
            ]
          }
        ]
      },
      {
        name: "Jagtial",
        mandals: [
          {
            name: "Jagtial",
            villages: [
              { name: "Jagtial Town", pincode: "505327" },
              { name: "Dharoor", pincode: "505327" },
              { name: "Korutla", pincode: "505326" },
              { name: "Metpally", pincode: "505325" }
            ]
          }
        ]
      },
      {
        name: "Kamareddy",
        mandals: [
          {
            name: "Kamareddy",
            villages: [
              { name: "Kamareddy Town", pincode: "503111" },
              { name: "Banswada", pincode: "503187" },
              { name: "Yellareddy", pincode: "503122" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Punjab",
    districts: [
      {
        name: "Ludhiana",
        mandals: [
          {
            name: "Jagraon",
            villages: [
              { name: "Sidhwan Bet", pincode: "142033" },
              { name: "Swaddi Khas", pincode: "142026" }
            ]
          },
          {
            name: "Khanna",
            villages: [
              { name: "Bhadla", pincode: "141401" },
              { name: "Ikolaha", pincode: "141401" }
            ]
          }
        ]
      },
      {
        name: "Amritsar",
        mandals: [
          {
            name: "Ajnala",
            villages: [
              { name: "Bhakna", pincode: "143102" },
              { name: "Chogawan", pincode: "143109" }
            ]
          }
        ]
      },
      {
        name: "Bhatinda",
        mandals: [
          {
            name: "Talwandi Sabo",
            villages: [
              { name: "Bangi Kalan", pincode: "151302" },
              { name: "Rama", pincode: "151301" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Maharashtra",
    districts: [
      {
        name: "Nashik",
        mandals: [
          {
            name: "Niphad",
            villages: [
              { name: "Pimpalgaon Baswant", pincode: "422209" },
              { name: "Ozar", pincode: "422206" }
            ]
          }
        ]
      },
      {
        name: "Pune",
        mandals: [
          {
            name: "Baramati",
            villages: [
              { name: "Malegaon Budruk", pincode: "413115" },
              { name: "Someshwar", pincode: "412306" }
            ]
          }
        ]
      },
      {
        name: "Nagpur",
        mandals: [
          {
            name: "Saoner",
            villages: [
              { name: "Kelwad", pincode: "441102" },
              { name: "Khapa", pincode: "441101" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Karnataka",
    districts: [
      {
        name: "Mandya",
        mandals: [
          {
            name: "Maddur",
            villages: [
              { name: "Besagarahalli", pincode: "571419" },
              { name: "Koppa", pincode: "571425" }
            ]
          }
        ]
      },
      {
        name: "Belagavi",
        mandals: [
          {
            name: "Chikkodi",
            villages: [
              { name: "Examba", pincode: "591211" },
              { name: "Nipani", pincode: "591237" }
            ]
          }
        ]
      },
      {
        name: "Shimoga",
        mandals: [
          {
            name: "Sagar",
            villages: [
              { name: "Talaguppa", pincode: "577430" },
              { name: "Kumsi", pincode: "577428" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Tamil Nadu",
    districts: [
      {
        name: "Thanjavur",
        mandals: [
          {
            name: "Kumbakonam",
            villages: [
              { name: "Dharasuram", pincode: "612702" },
              { name: "Swamimalai", pincode: "612302" }
            ]
          }
        ]
      },
      {
        name: "Coimbatore",
        mandals: [
          {
            name: "Pollachi",
            villages: [
              { name: "Anaimalai", pincode: "642104" },
              { name: "Kinathukadavu", pincode: "642109" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Gujarat",
    districts: [
      {
        name: "Anand",
        mandals: [
          {
            name: "Petlad",
            villages: [
              { name: "Dharmaj", pincode: "388430" },
              { name: "Sunav", pincode: "388470" }
            ]
          }
        ]
      },
      {
        name: "Rajkot",
        mandals: [
          {
            name: "Gondal",
            villages: [
              { name: "Bhavnath", pincode: "360311" },
              { name: "Virpur", pincode: "360317" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Uttar Pradesh",
    districts: [
      {
        name: "Agra",
        mandals: [
          {
            name: "Fatehabad",
            villages: [
              { name: "Fatehabad Khas", pincode: "283111" },
              { name: "Piprait", pincode: "283111" }
            ]
          }
        ]
      },
      {
        name: "Varanasi",
        mandals: [
          {
            name: "Pindra",
            villages: [
              { name: "Phoolpur", pincode: "221206" },
              { name: "Babatpur", pincode: "221206" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Bihar",
    districts: [
      {
        name: "Muzaffarpur",
        mandals: [
          {
            name: "Kanti",
            villages: [
              { name: "Kanti Kasba", pincode: "843109" },
              { name: "Manika", pincode: "843109" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Rajasthan",
    districts: [
      {
        name: "Ganganagar",
        mandals: [
          {
            name: "Suratgarh",
            villages: [
              { name: "Rajiyasar", pincode: "335804" },
              { name: "Manakser", pincode: "335804" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Madhya Pradesh",
    districts: [
      {
        name: "Ujjain",
        mandals: [
          {
            name: "Nagda",
            villages: [
              { name: "Khachrod", pincode: "456224" },
              { name: "Unhel", pincode: "456221" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "West Bengal",
    districts: [
      {
        name: "Hooghly",
        mandals: [
          {
            name: "Singur",
            villages: [
              { name: "Beraberi", pincode: "712409" },
              { name: "Gopalnagar", pincode: "712409" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Kerala",
    districts: [
      {
        name: "Palakkad",
        mandals: [
          {
            name: "Chittur",
            villages: [
              { name: "Kollengode", pincode: "678506" },
              { name: "Pudunagaram", pincode: "678501" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Haryana",
    districts: [
      {
        name: "Karnal",
        mandals: [
          {
            name: "Gharaunda",
            villages: [
              { name: "Kohand", pincode: "132114" },
              { name: "Bastada", pincode: "132114" }
            ]
          }
        ]
      }
    ]
  }
];

export function getStates(): string[] {
  return locationHierarchy.map((s) => s.name);
}

export function getDistricts(stateName: string): string[] {
  const st = locationHierarchy.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  return st ? st.districts.map((d) => d.name) : [];
}

export function getMandals(stateName: string, districtName: string): string[] {
  const st = locationHierarchy.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!st) return [];
  const dist = st.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  return dist ? dist.mandals.map((m) => m.name) : [];
}

export function getVillages(
  stateName: string,
  districtName: string,
  mandalName: string
): VillageInfo[] {
  const st = locationHierarchy.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!st) return [];
  const dist = st.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  if (!dist) return [];
  const mnd = dist.mandals.find((m) => m.name.toLowerCase() === mandalName.toLowerCase());
  return mnd ? mnd.villages : [];
}

