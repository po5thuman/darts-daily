// ════════════════════════════════════════════════════════════════
// DARTS WORD — HANGMAN STYLE
// ════════════════════════════════════════════════════════════════
const WORDS = [
    { word: "RANKING", hint: "A player's position in an ordered standings list" },
    { word: "KALTER", hint: "Complete the darts player’s name: Dennie Olde ___" },
    { word: "DIMITRI", hint: "Complete the darts player’s name: ___ Van den Bergh" },
    { word: "BUNTING", hint: "Complete the darts player’s name: Stephen ___" },
    { word: "CAMERON", hint: "Complete the darts player’s name: ___ Menzies" },
    { word: "CARDIFF", hint: "Welsh capital that hosts Premier League darts" },
    { word: "BENJAMIN", hint: "Complete the darts player’s name: ___ Pratnemer" },
    { word: "JAPAN", hint: "Country represented by Mikuru Suzuki" },
    { word: "GERWYN", hint: "Complete the darts player’s name: ___ Price" },
    { word: "GROUPING", hint: "How closely darts land together" },
    { word: "WINMAU", hint: "Manufacturer of the Blade dartboard" },
    { word: "SOUTAR", hint: "Complete the darts player’s name: Alan ___" },
    { word: "RICHARD", hint: "Complete the darts player’s name: ___ Veenstra" },
    { word: "BULL", hint: "The centre scoring area of a dartboard" },
    { word: "QUALIFY", hint: "Earn a place in a tournament" },
    { word: "TUNGSTEN", hint: "Dense metal used in many premium dart barrels" },
    { word: "RUNNER", hint: "___-up — losing finalist" },
    { word: "POINT", hint: "The sharp end of a dart" },
    { word: "CHARLIE", hint: "Complete the darts player’s name: ___ Manby" },
    { word: "HAMILTON", hint: "Complete the darts player’s name: Andy ___" },
    { word: "STICK", hint: "When a dart stays in the board" },
    { word: "PILGRIM", hint: "Complete the darts player’s name: Darryl ___" },
    { word: "RICKY", hint: "Complete the darts player’s name: ___ Evans" },
    { word: "MIKE", hint: "Complete the darts player’s name: ___ De Decker" },
    { word: "CALLAN", hint: "Complete the darts player’s name: ___ Rydz" },
    { word: "EXETER", hint: "English city that has hosted Premier League darts" },
    { word: "TITANIUM", hint: "Metal used in some premium shafts" },
    { word: "ANDY", hint: "Complete the darts player’s name: ___ Hamilton" },
    { word: "ASPINALL", hint: "Complete the darts player’s name: Nathan ___" },
    { word: "WORLD", hint: "___ Championship — the biggest event" },
    { word: "RATAJSKI", hint: "Complete the darts player’s name: Krzystof ___" },
    { word: "GERWEN", hint: "Complete the darts player’s name: Michael van ___" },
    { word: "GAWLAS", hint: "Complete the darts player’s name: Adam ___" },
    { word: "SCORE", hint: "Points you earn each turn" },
    { word: "RUBBER", hint: "Material used in some protective dart mats" },
    { word: "EHLERS", hint: "Complete the darts player’s name: Matthias ___" },
    { word: "FLOOR", hint: "Where the oche line sits" },
    { word: "BULLY", hint: "___ Boy — Michael Smith's nickname" },
    { word: "DOBEY", hint: "Complete the darts player’s name: Chris ___" },
    { word: "CHISNALL", hint: "Complete the darts player’s name: Dave ___" },
    { word: "CRISTO", hint: "Complete the darts player’s name: ___ Reyes" },
    { word: "EIGHT", hint: "The number between eleven and sixteen on a standard board" },
    { word: "MARVIN", hint: "Complete the darts player’s name: ___ van Velzen" },
    { word: "BEAU", hint: "Complete the darts player’s name: ___ Greaves" },
    { word: "SCOTLAND", hint: "Country represented by Gary Anderson" },
    { word: "JACKPOT", hint: "Adrian Lewis's nickname" },
    { word: "DEFEAT", hint: "A match loss" },
    { word: "GREAVES", hint: "Complete the darts player’s name: Beau ___" },
    { word: "PLAYER", hint: "Person competing at the oche" },
    { word: "MEIKLE", hint: "Complete the darts player’s name: Ryan ___" },
    { word: "TOTAL", hint: "Your combined score" },
    { word: "RHYTHM", hint: "Consistent timing of successive throws" },
    { word: "RINGS", hint: "The circular sections on a board" },
    { word: "SEGMENT", hint: "A numbered scoring section" },
    { word: "LEON", hint: "Complete the darts player’s name: ___ Weber" },
    { word: "REIGN", hint: "A champion's period of dominance" },
    { word: "DEKKER", hint: "Complete the darts player’s name: Cor ___" },
    { word: "BARREL", hint: "The main body of a dart" },
    { word: "ROUND", hint: "A stage of a knockout tournament" },
    { word: "RITCHIE", hint: "Complete the darts player’s name: ___ Edhouse" },
    { word: "TOMMY", hint: "Complete the darts player’s name: ___ Morris" },
    { word: "POLAND", hint: "Country hosting the Poland Darts Masters" },
    { word: "PERFECT", hint: "A nine-dart leg is a ___ leg" },
    { word: "UNICORN", hint: "Darts brand named after a mythical creature" },
    { word: "JUSTIN", hint: "Complete the darts player’s name: ___ Hood" },
    { word: "GABRIEL", hint: "Complete the darts player’s name: ___ Clemens" },
    { word: "DOMINIK", hint: "Complete the darts player’s name: ___ Gruellich" },
    { word: "BOGEY", hint: "A score below 171 that cannot be checked out in three darts" },
    { word: "SURGE", hint: "A sudden run of high scores" },
    { word: "THORPE", hint: "Complete the darts player’s name: Tyler ___" },
    { word: "STEPHEN", hint: "Complete the darts player’s name: ___ Bunting" },
    { word: "MASTERS", hint: "World ___ — tournament name" },
    { word: "MAXIMUM", hint: "A score of 180 in a three-dart visit" },
    { word: "SCHIE", hint: "Complete the darts player’s name: Jimmy van ___" },
    { word: "CRABTREE", hint: "Complete the darts player’s name: Cam ___" },
    { word: "JONNY", hint: "Complete the darts player’s name: ___ Clayton" },
    { word: "ROUTINE", hint: "Repeated preparation before throwing" },
    { word: "BOUNCE", hint: "___-out — a dart that fails to remain in the board" },
    { word: "FINAL", hint: "The last match of a tournament" },
    { word: "FLIGHT", hint: "The finned part at the rear of a dart" },
    { word: "BOARD", hint: "What you throw darts at" },
    { word: "RECORD", hint: "A best-ever documented achievement" },
    { word: "JEFFREY", hint: "Complete the darts player’s name: ___ de Graaf" },
    { word: "JOHN", hint: "Complete the darts player’s name: ___ Lowe" },
    { word: "FRANCE", hint: "Country represented by Thibault Tricole" },
    { word: "INNER", hint: "___ bull — the red centre" },
    { word: "BROOKS", hint: "Complete the darts player’s name: Bradley ___" },
    { word: "JOYCE", hint: "Complete the darts player’s name: Ryan ___" },
    { word: "FINISH", hint: "To complete a leg with the required double" },
    { word: "CROATIA", hint: "Country represented by Boris Krcmar" },
    { word: "TEAM", hint: "A national side in the World Cup" },
    { word: "DENNIE", hint: "Complete the darts player’s name: ___ Olde Kalter" },
    { word: "FINLAND", hint: "Country represented by Marko Kantele" },
    { word: "STEEL", hint: "Type of dart tip" },
    { word: "DARYL", hint: "Complete the darts player’s name: ___ Gurney" },
    { word: "CLAYTON", hint: "Complete the darts player’s name: Jonny ___" },
    { word: "VENUE", hint: "Place where a tournament is held" },
    { word: "RANKED", hint: "Placed in an ordered standings list" },
    { word: "KNOCKOUT", hint: "Format in which a defeat eliminates a player" },
    { word: "THUMB", hint: "Digit often supporting the dart barrel" },
    { word: "SEED", hint: "Player given a designated draw position based on ranking" },
    { word: "IRELAND", hint: "Country represented by William O'Connor" },
    { word: "YORICK", hint: "Complete the darts player’s name: ___ Hofkens" },
    { word: "BRISTLE", hint: "Traditional sisal dartboard type" },
    { word: "SHARP", hint: "How your dart points should be" },
    { word: "LEEDS", hint: "English city that has hosted Premier League nights" },
    { word: "TARGET", hint: "What you aim at; also a darts equipment brand" },
    { word: "BERGH", hint: "Complete the darts player’s name: Dimitri Van den ___" },
    { word: "BATES", hint: "Complete the darts player’s name: Owen ___" },
    { word: "GRAAF", hint: "Complete the darts player’s name: Jeffrey de ___" },
    { word: "CHALK", hint: "Used to mark scores on a chalkboard" },
    { word: "INDEX", hint: "___ finger — commonly used to grip a dart" },
    { word: "METRES", hint: "Metric units used for oche distance" },
    { word: "SOUSA", hint: "Complete the darts player’s name: Jose de ___" },
    { word: "PRIZE", hint: "Money awarded to the winner" },
    { word: "MANBY", hint: "Complete the darts player’s name: Charlie ___" },
    { word: "SEDLACEK", hint: "Complete the darts player’s name: Karel ___" },
    { word: "YOUTH", hint: "World ___ Championship" },
    { word: "CENTRE", hint: "Location of the bullseye in British spelling" },
    { word: "TOPS", hint: "Nickname for double twenty" },
    { word: "BRADLEY", hint: "Complete the darts player’s name: ___ Brooks" },
    { word: "PAINTER", hint: "Complete the darts player’s name: Kevin ___" },
    { word: "ANDERSON", hint: "Complete the darts player’s name: Gary ___" },
    { word: "DOUBLES", hint: "Team format with two players per side" },
    { word: "GRIFFIN", hint: "Complete the darts player’s name: Rhys ___" },
    { word: "LEAGUE", hint: "Premier ___ Darts" },
    { word: "CLEMENS", hint: "Complete the darts player’s name: Gabriel ___" },
    { word: "DUBLIN", hint: "Irish capital that has hosted the World Grand Prix" },
    { word: "NOPPERT", hint: "Complete the darts player’s name: Danny ___" },
    { word: "FOURTEEN", hint: "Number worth 42 when trebled" },
    { word: "PAXTON", hint: "Complete the darts player’s name: Adam ___" },
    { word: "RELEASE", hint: "The moment the dart leaves your fingers" },
    { word: "HUNT", hint: "Complete the darts player’s name: Joe ___" },
    { word: "ROBERT", hint: "Complete the darts player’s name: ___ Owen" },
    { word: "NINE", hint: "Minimum darts needed to finish a standard 501 leg" },
    { word: "WILLIAM", hint: "Complete the darts player’s name: ___ O'Connor" },
    { word: "KAREL", hint: "Complete the darts player’s name: ___ Sedlacek" },
    { word: "MISSED", hint: "Failed to hit the intended target" },
    { word: "AIMING", hint: "Directing a dart towards a target" },
    { word: "WIRE", hint: "Metal divider between scoring areas" },
    { word: "CONNOR", hint: "Complete the darts player’s name: ___ Scutt" },
    { word: "ANDREW", hint: "Complete the darts player’s name: ___ Gilding" },
    { word: "PASCAL", hint: "Complete the darts player’s name: ___ Rupprecht" },
    { word: "WARNER", hint: "Complete the darts player’s name: Adam ___" },
    { word: "NUMBER", hint: "Each main scoring section has one" },
    { word: "MANSELL", hint: "Complete the darts player’s name: Mickey ___" },
    { word: "PRESSURE", hint: "What players feel when facing a crucial double" },
    { word: "ZWAAN", hint: "Complete the darts player’s name: Jeffrey De ___" },
    { word: "WEBSTER", hint: "Complete the darts player’s name: Mark ___" },
    { word: "RALLY", hint: "A comeback run of winning legs" },
    { word: "TAPER", hint: "Gradual narrowing of a dart barrel" },
    { word: "MORRIS", hint: "Complete the darts player’s name: Tommy ___" },
    { word: "COMEBACK", hint: "Recovering from a losing position" },
    { word: "BURTON", hint: "Complete the darts player’s name: Stephen ___" },
    { word: "SOFT", hint: "___ tip — darts designed for electronic boards" },
    { word: "ARENA", hint: "Large venue for a darts event" },
    { word: "ABERDEEN", hint: "Scottish city that hosts Premier League darts" },
    { word: "MAJOR", hint: "A big tournament" },
    { word: "PLASTIC", hint: "Material used for soft tips and many shafts" },
    { word: "SPORT", hint: "Darts is a popular ___" },
    { word: "LENGTH", hint: "Measurement from one end of a dart component to the other" },
    { word: "DENMARK", hint: "Country hosting the Nordic Darts Masters" },
    { word: "ALLOY", hint: "Metal mixture used in dart barrels" },
    { word: "TEMPO", hint: "Speed of a player's throwing routine" },
    { word: "BULLS", hint: "Plural of bull — the central scoring area" },
    { word: "LONG", hint: "Complete the darts player’s name: Jim ___" },
    { word: "DECIDER", hint: "The final leg when scores are level and one leg remains" },
    { word: "VEEN", hint: "Complete the darts player’s name: Gian van ___" },
    { word: "ANGLE", hint: "The trajectory of your throw" },
    { word: "DOLAN", hint: "Complete the darts player’s name: Brendan ___" },
    { word: "SINGLES", hint: "Format with one player per side" },
    { word: "MARDLE", hint: "Complete the darts player’s name: Wayne ___" },
    { word: "BREAK", hint: "Winning a leg in which your opponent threw first" },
    { word: "GILDING", hint: "Complete the darts player’s name: Andrew ___" },
    { word: "DAVID", hint: "Complete the darts player’s name: ___ Sharp" },
    { word: "BELGIUM", hint: "Country represented by Dimitri Van den Bergh" },
    { word: "LEEK", hint: "Complete the darts player’s name: Adam ___" },
    { word: "SPRING", hint: "Small coil used to secure some flights" },
    { word: "NIJMAN", hint: "Complete the darts player’s name: Wessel ___" },
    { word: "FANS", hint: "Supporters of the sport" },
    { word: "AUDIENCE", hint: "People watching a match" },
    { word: "SIETSE", hint: "Complete the darts player’s name: ___ Lap" },
    { word: "HARROWS", hint: "Darts equipment brand with a name ending in arrows" },
    { word: "FIFTEEN", hint: "Number worth 45 when trebled" },
    { word: "PARTNER", hint: "Your teammate in a pairs event" },
    { word: "FOCUS", hint: "Concentration needed for a big finish" },
    { word: "TYLER", hint: "Complete the darts player’s name: ___ Thorpe" },
    { word: "BELFAST", hint: "Northern Irish capital that hosts Premier League darts" },
    { word: "ADAMS", hint: "Complete the darts player’s name: Martin ___" },
    { word: "LUKE", hint: "Complete the darts player’s name: ___ Littler" },
    { word: "OCHE", hint: "The line you throw from" },
    { word: "NICK", hint: "Complete the darts player’s name: ___ Kenny" },
    { word: "SMITH", hint: "Michael ___ — Bully Boy" },
    { word: "TRICOLE", hint: "Complete the darts player’s name: Thibault ___" },
    { word: "CULLEN", hint: "Complete the darts player’s name: Joe ___" },
    { word: "FOLLOW", hint: "___ through — continuing the throwing motion" },
    { word: "CAMERA", hint: "Equipment capturing televised throws" },
    { word: "RAZMA", hint: "Complete the darts player’s name: Madars ___" },
    { word: "MERVYN", hint: "Complete the darts player’s name: ___ King" },
    { word: "POSTURE", hint: "The way you hold your body while throwing" },
    { word: "VEENSTRA", hint: "Complete the darts player’s name: Richard ___" },
    { word: "GRIPS", hint: "The texture on a dart barrel" },
    { word: "VELDE", hint: "Complete the darts player’s name: Jurjen van der ___" },
    { word: "LUKEMAN", hint: "Complete the darts player’s name: Martin ___" },
    { word: "OSKAR", hint: "Complete the darts player’s name: ___ Lukasiak" },
    { word: "SPIDER", hint: "Wire framework separating scoring segments" },
    { word: "JIMMY", hint: "Complete the darts player’s name: ___ van Schie" },
    { word: "MARTIN", hint: "Complete the darts player’s name: ___ Adams" },
    { word: "CHECKOUT", hint: "A combination that finishes a leg" },
    { word: "CLIMB", hint: "Moving up the rankings" },
    { word: "ROSS", hint: "Complete the darts player’s name: ___ Smith" },
    { word: "HOOD", hint: "Robin ___ — when one dart sticks into another" },
    { word: "JENKINS", hint: "Complete the darts player’s name: Terry ___" },
    { word: "MINEHEAD", hint: "Somerset town hosting the UK Open" },
    { word: "SPIKE", hint: "The metal point of a steel tip dart" },
    { word: "DEBUT", hint: "A player's first appearance" },
    { word: "AVERAGE", hint: "Mean points per three darts" },
    { word: "KRAFT", hint: "Complete the darts player’s name: Marvin ___" },
    { word: "JOSE", hint: "Complete the darts player’s name: ___ de Sousa" },
    { word: "OLDE", hint: "Complete the darts player’s name: Dennie ___ Kalter" },
    { word: "CROWD", hint: "The fans watching the match" },
    { word: "TRICK", hint: "___ shot — a fancy throw" },
    { word: "FORDHAM", hint: "Complete the darts player’s name: Andy ___" },
    { word: "HOPP", hint: "Complete the darts player’s name: Max ___" },
    { word: "PRICE", hint: "Gerwyn ___ — Welsh world champion" },
    { word: "SCUTT", hint: "Complete the darts player’s name: Connor ___" },
    { word: "OPPONENT", hint: "The person you are playing against" },
    { word: "MISSION", hint: "Darts equipment brand whose name means an assignment" },
    { word: "BRISTOW", hint: "Complete the darts player’s name: Eric ___" },
    { word: "KENNY", hint: "Complete the darts player’s name: Nick ___" },
    { word: "STEMS", hint: "Another word for dart shafts" },
    { word: "DRAW", hint: "Process that determines tournament pairings" },
    { word: "TWENTY", hint: "The number at the top of a standard board" },
    { word: "CALLER", hint: "Official who announces the score" },
    { word: "GREEN", hint: "Traditional colour of the outer bull" },
    { word: "ICEMAN", hint: "Gerwyn Price's nickname without the article" },
    { word: "PAIRS", hint: "Format featuring teams of two" },
    { word: "SERIES", hint: "World ___ of Darts" },
    { word: "ARNO", hint: "Complete the darts player’s name: ___ Merk" },
    { word: "STAGE", hint: "Where players perform at the Ally Pally" },
    { word: "POINTS", hint: "Units added to a score" },
    { word: "STREAK", hint: "A consecutive run of wins" },
    { word: "CHRIS", hint: "Complete the darts player’s name: ___ Dobey" },
    { word: "VETERAN", hint: "An experienced competitor" },
    { word: "MENZIES", hint: "Complete the darts player’s name: Cameron ___" },
    { word: "SHANE", hint: "Complete the darts player’s name: ___ McGuirk" },
    { word: "NIELS", hint: "Complete the darts player’s name: ___ Zonneveld" },
    { word: "WESLEY", hint: "Complete the darts player’s name: ___ Plaisier" },
    { word: "RAYMOND", hint: "Complete the darts player’s name: ___ van Barneveld" },
    { word: "WIDTH", hint: "Measurement across a dart barrel" },
    { word: "BRACKET", hint: "Diagram showing knockout matchups" },
    { word: "SHERROCK", hint: "Complete the darts player’s name: Fallon ___" },
    { word: "PART", hint: "Complete the darts player’s name: John ___" },
    { word: "WAITES", hint: "Complete the darts player’s name: Scott ___" },
    { word: "GRAND", hint: "___ Prix — a major PDC ranking event" },
    { word: "SIXTY", hint: "The highest single-dart score" },
    { word: "VICTORY", hint: "Another word for a win" },
    { word: "TROPHY", hint: "Physical award presented to a winner" },
    { word: "DAMON", hint: "Complete the darts player’s name: ___ Heta" },
    { word: "BEREZA", hint: "Complete the darts player’s name: Filip ___" },
    { word: "THROW", hint: "What you do with a dart" },
    { word: "DIAMOND", hint: "Ian White's nickname" },
    { word: "MICHAEL", hint: "Complete the darts player’s name: ___ van Gerwen" },
    { word: "KIST", hint: "Complete the darts player’s name: Christian ___" },
    { word: "MUSIC", hint: "What accompanies a player's entrance" },
    { word: "LOWE", hint: "Complete the darts player’s name: John ___" },
    { word: "WINNER", hint: "Player who defeats the opponent" },
    { word: "MERIT", hint: "Order of ___ — how players are ranked" },
    { word: "EARNINGS", hint: "Money won through tournament results" },
    { word: "VOLTAGE", hint: "Rob Cross's nickname" },
    { word: "CANADA", hint: "Country represented by John Part" },
    { word: "KING", hint: "Complete the darts player’s name: Mervyn ___" },
    { word: "CAREER", hint: "A player's years in competitive darts" },
    { word: "SISAL", hint: "Material used in bristle dartboards" },
    { word: "REYES", hint: "Complete the darts player’s name: Cristo ___" },
    { word: "LANDMAN", hint: "Complete the darts player’s name: Chris ___" },
    { word: "BUST", hint: "Going below zero or leaving one in double-out play" },
    { word: "FIFTY", hint: "Score for a single bullseye" },
    { word: "GRIP", hint: "How a player holds the dart" },
    { word: "THOMAS", hint: "Complete the darts player’s name: ___ Lovely" },
    { word: "ROCKSTAR", hint: "Joe Cullen's nickname without the article" },
    { word: "ELBOW", hint: "Arm joint often kept steady during a throw" },
    { word: "LEGEND", hint: "A celebrated figure in the sport" },
    { word: "MEASURE", hint: "Check the throwing distance with a tape" },
    { word: "GROUP", hint: "A pool of players competing before knockout rounds" },
    { word: "STEFAAN", hint: "Complete the darts player’s name: ___ Henderyck" },
    { word: "WESSEL", hint: "Complete the darts player’s name: ___ Nijman" },
    { word: "ROSNEY", hint: "Complete the darts player’s name: Stephen ___" },
    { word: "BLOCKED", hint: "Obstructed by a dart already in the board" },
    { word: "CLUSTER", hint: "A tight group of darts in the board" },
    { word: "WRIGHT", hint: "Complete the darts player’s name: Peter ___" },
    { word: "OUTER", hint: "___ bull — the green ring" },
    { word: "BIALECKI", hint: "Complete the darts player’s name: Sebastian ___" },
    { word: "TITLE", hint: "What the winner of a championship earns" },
    { word: "ADRIAN", hint: "Complete the darts player’s name: ___ Lewis" },
    { word: "HUNDRED", hint: "A ton in darts scoring" },
    { word: "DECKER", hint: "Complete the darts player’s name: Mike De ___" },
    { word: "DUDENEY", hint: "Complete the darts player’s name: Tavis ___" },
    { word: "DIRK", hint: "Complete the darts player’s name: ___ van Duijvenbode" },
    { word: "CHEER", hint: "Sound of approval from spectators" },
    { word: "WEBER", hint: "Complete the darts player’s name: Leon ___" },
    { word: "HITS", hint: "Successful strikes on the intended target" },
    { word: "REFEREE", hint: "Official overseeing a match" },
    { word: "FLYER", hint: "A dart that goes off target" },
    { word: "SIXTEEN", hint: "Number worth 32 when doubled" },
    { word: "NATHAN", hint: "Complete the darts player’s name: ___ Aspinall" },
    { word: "BARRY", hint: "Complete the darts player’s name: Keane ___" },
    { word: "SNEYD", hint: "Complete the darts player’s name: Carl ___" },
    { word: "AUSTRIA", hint: "Country hosting a European Tour Darts Open" },
    { word: "LIVE", hint: "Broadcast as the action happens" },
    { word: "HENRY", hint: "Complete the darts player’s name: ___ Coates" },
    { word: "WALES", hint: "Country represented by Gerwyn Price" },
    { word: "MENSUR", hint: "Complete the darts player’s name: ___ Suljovic" },
    { word: "JOSH", hint: "Complete the darts player’s name: ___ Rock" },
    { word: "LATVIA", hint: "Country represented by Madars Razma" },
    { word: "JERMAINE", hint: "Complete the darts player’s name: ___ Wattimena" },
    { word: "LONDON", hint: "City containing Alexandra Palace" },
    { word: "CASES", hint: "Where you store your darts" },
    { word: "TONY", hint: "Complete the darts player’s name: ___ O'Shea" },
    { word: "FERRET", hint: "Jonny Clayton's nickname without the article" },
    { word: "BRENDAN", hint: "Complete the darts player’s name: ___ Dolan" },
    { word: "CROWN", hint: "A champion wears the ___" },
    { word: "SHOT", hint: "New Zealand darts brand; also an attempt at a target" },
    { word: "HETA", hint: "Complete the darts player’s name: Damon ___" },
    { word: "RAPID", hint: "Ricky Evans's nickname" },
    { word: "TRAINING", hint: "Work undertaken to improve performance" },
    { word: "WADE", hint: "Complete the darts player’s name: James ___" },
    { word: "ENGLAND", hint: "Country represented by Phil Taylor" },
    { word: "STANCE", hint: "How you position your feet at the oche" },
    { word: "CHANT", hint: "Repeated song or slogan from fans" },
    { word: "MACHINE", hint: "James Wade's nickname without the article" },
    { word: "NERVE", hint: "What you need in a big final" },
    { word: "ARROW", hint: "Another name for a dart" },
    { word: "ERIC", hint: "Complete the darts player’s name: ___ Bristow" },
    { word: "CABINET", hint: "Wall-mounted enclosure for a dartboard" },
    { word: "RICARDO", hint: "Complete the darts player’s name: ___ Pietreczko" },
    { word: "TICKET", hint: "Pass allowing a spectator into an event" },
    { word: "MARKER", hint: "A dart that helps guide the next throw" },
    { word: "DYNAMITE", hint: "Keane Barry's nickname" },
    { word: "ALAN", hint: "Complete the darts player’s name: ___ Soutar" },
    { word: "DANNY", hint: "Complete the darts player’s name: ___ Noppert" },
    { word: "GROOVE", hint: "Recess cut into a barrel for grip" },
    { word: "PETER", hint: "___ Wright — Snakebite" },
    { word: "WRIST", hint: "Joint between the hand and forearm" },
    { word: "WEIGHT", hint: "Mass of a dart, usually measured in grams" },
    { word: "DUBAI", hint: "City that hosted World Series darts events" },
    { word: "GRAMS", hint: "Units commonly used for dart weight" },
    { word: "COATES", hint: "Complete the darts player’s name: Henry ___" },
    { word: "LJUBIC", hint: "Complete the darts player’s name: Pero ___" },
    { word: "LASER", hint: "___ oche — projects the throw line" },
    { word: "MCGUIRK", hint: "Complete the darts player’s name: Shane ___" },
    { word: "TALLY", hint: "To keep count of the score" },
    { word: "AIMED", hint: "Directed towards a chosen segment" },
    { word: "HAWAII", hint: "___ 501 — Wayne Mardle's nickname" },
    { word: "TREBLE", hint: "The scoring ring that triples a segment value" },
    { word: "BOBBY", hint: "___ George — legendary darts player" },
    { word: "NYLON", hint: "Common shaft material" },
    { word: "KEVIN", hint: "Complete the darts player’s name: ___ Painter" },
    { word: "BRASS", hint: "Budget dart barrel material" },
    { word: "CROSS", hint: "Complete the darts player’s name: Rob ___" },
    { word: "BAHRAIN", hint: "Country hosting a World Series Darts Masters event" },
    { word: "ACCURACY", hint: "Ability to hit the intended target" },
    { word: "SPLIT", hint: "To divide a score into two parts" },
    { word: "DISTANCE", hint: "Measurement from the board face to the oche" },
    { word: "EUROPEAN", hint: "___ Championship — PDC tournament" }
];

const MAX_WRONG = 6;
let todaysWord = "";
let todaysHint = "";
let guessedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

// ════════════════════════════════════════════════════════════════
// DATE & WORD SELECTION
// ════════════════════════════════════════════════════════════════
function getDayOfYear() {
    const n = new Date();
    const start = Date.UTC(n.getUTCFullYear(), 0, 1);
    const today = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
    return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

function getUTCDateString() {
    const n = new Date();
    return n.getUTCFullYear() + "-" + String(n.getUTCMonth() + 1).padStart(2, "0") + "-" + String(n.getUTCDate()).padStart(2, "0");
}

function getTodaysWord() {
    const dayOfYear = getDayOfYear();
    return WORDS[dayOfYear % WORDS.length];
}

// ════════════════════════════════════════════════════════════════
// BUILD UI
// ════════════════════════════════════════════════════════════════
function buildTiles() {
    const container = document.getElementById("word-tiles");
    container.innerHTML = "";
    for (let i = 0; i < todaysWord.length; i++) {
        const tile = document.createElement("div");
        tile.className = "word-tile";
        tile.id = "tile-" + i;
        tile.textContent = "";
        container.appendChild(tile);
    }
}

function buildKeyboard() {
    const keyboard = document.getElementById("wordle-keyboard");
    keyboard.innerHTML = "";
    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ];
    rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";
        row.forEach(key => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = key;
            btn.id = "key-" + key;
            btn.addEventListener("click", () => handleGuess(key));
            rowDiv.appendChild(btn);
        });
        keyboard.appendChild(rowDiv);
    });
}

// ════════════════════════════════════════════════════════════════
// GAME LOGIC
// ════════════════════════════════════════════════════════════════
function handleGuess(letter) {
    if (gameOver) return;
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);

    const key = document.getElementById("key-" + letter);
    if (key) key.classList.add("used");

    if (todaysWord.includes(letter)) {
        for (let i = 0; i < todaysWord.length; i++) {
            if (todaysWord[i] === letter) {
                const tile = document.getElementById("tile-" + i);
                tile.textContent = letter;
                tile.classList.add("revealed");
            }
        }
        const allRevealed = todaysWord.split("").every(l => guessedLetters.includes(l));
        if (allRevealed) {
            gameOver = true;
            for (let i = 0; i < todaysWord.length; i++) {
                const tile = document.getElementById("tile-" + i);
                tile.classList.remove("revealed");
                tile.classList.add("revealed-final");
            }
            const messages = ["Genius! 🎯","Brilliant! 🎯","Impressive! 🎯","Well played! 🎯","Nice one! 🎯","Phew! 🎯"];
            showMessage(messages[Math.min(wrongGuesses, messages.length - 1)]);
            saveGameState(true);
            showShareButton();
        }
    } else {
        const lifeEl = document.getElementById("life-" + (MAX_WRONG - 1 - wrongGuesses));
        if (lifeEl) lifeEl.classList.add("lost");
        wrongGuesses++;
        updateLivesLabel();
        if (wrongGuesses >= MAX_WRONG) {
            gameOver = true;
            for (let i = 0; i < todaysWord.length; i++) {
                const tile = document.getElementById("tile-" + i);
                if (!tile.textContent) tile.textContent = todaysWord[i];
                tile.classList.remove("revealed");
                tile.classList.add("revealed-fail");
            }
            showMessage("The word was " + todaysWord);
            saveGameState(false);
            showShareButton();
        }
    }
    saveProgress();
}

function updateLivesLabel() {
    const remaining = MAX_WRONG - wrongGuesses;
    document.getElementById("lives-label").textContent = remaining + " dart" + (remaining !== 1 ? "s" : "") + " remaining";
}

// ════════════════════════════════════════════════════════════════
// MESSAGES & SHARE
// ════════════════════════════════════════════════════════════════
function showMessage(text) {
    document.getElementById("wordle-message").innerHTML = "<span>" + text + "</span>";
}

function showShareButton() {
    document.getElementById("wordle-share-container").style.display = "block";
}

function buildShareText() {
    const today = getUTCDateString();
    const won = todaysWord.split("").every(l => guessedLetters.includes(l));
    const remaining = MAX_WRONG - wrongGuesses;
    let text = "🎯 Darts Word " + today + "\n";
    text += won ? "Solved with " + remaining + "/6 darts remaining!\n" : "❌ Failed\n";
    text += "\n";
    for (let i = 0; i < todaysWord.length; i++) {
        text += won ? "🟩" : (guessedLetters.includes(todaysWord[i]) ? "🟩" : "🟥");
    }
    text += "\n";
    text += "🎯".repeat(remaining) + "✖️".repeat(wrongGuesses);
    text += "\n\nhttps://www.dartsdaily.net";
    return text;
}

function shareResult() {
    const text = buildShareText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById("wordle-share-btn");
            const span = btn.querySelector("span");
            span.textContent = "Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
                span.textContent = "Share Result";
                btn.classList.remove("copied");
            }, 2000);
        });
    }
}

// ════════════════════════════════════════════════════════════════
// STATS & PERSISTENCE
// ════════════════════════════════════════════════════════════════
function loadStats() {
    const stats = JSON.parse(localStorage.getItem("dartsWordStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    document.getElementById("w-played").textContent = stats.played;
    document.getElementById("w-win-pct").textContent = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
    document.getElementById("w-streak").textContent = stats.streak;
    document.getElementById("w-max-streak").textContent = stats.maxStreak;
    return stats;
}

function saveGameState(won) {
    const stats = JSON.parse(localStorage.getItem("dartsWordStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    stats.played++;
    if (won) {
        stats.won++;
        stats.streak++;
        if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
    } else {
        stats.streak = 0;
    }
    localStorage.setItem("dartsWordStats", JSON.stringify(stats));
    loadStats();
    saveProgress();
}

function saveProgress() {
    localStorage.setItem("dartsWordDate", getUTCDateString());
    localStorage.setItem("dartsWordGuessed", JSON.stringify(guessedLetters));
    localStorage.setItem("dartsWordWrong", wrongGuesses.toString());
    localStorage.setItem("dartsWordOver", gameOver ? "true" : "false");
}

function restoreGame() {
    const savedDate = localStorage.getItem("dartsWordDate");
    const today = getUTCDateString();
    if (savedDate !== today) {
        localStorage.removeItem("dartsWordGuessed");
        localStorage.removeItem("dartsWordWrong");
        localStorage.removeItem("dartsWordOver");
        return;
    }
    const savedGuessed = JSON.parse(localStorage.getItem("dartsWordGuessed") || "[]");
    const savedWrong = parseInt(localStorage.getItem("dartsWordWrong") || "0");
    const wasOver = localStorage.getItem("dartsWordOver") === "true";

    guessedLetters = savedGuessed;
    wrongGuesses = savedWrong;

    guessedLetters.forEach(letter => {
        const key = document.getElementById("key-" + letter);
        if (key) key.classList.add("used");
    });

    for (let i = 0; i < todaysWord.length; i++) {
        if (guessedLetters.includes(todaysWord[i])) {
            const tile = document.getElementById("tile-" + i);
            tile.textContent = todaysWord[i];
            tile.classList.add("revealed");
        }
    }

    for (let i = 0; i < wrongGuesses; i++) {
        const lifeEl = document.getElementById("life-" + (MAX_WRONG - 1 - i));
        if (lifeEl) lifeEl.classList.add("lost");
    }

    updateLivesLabel();

    if (wasOver) {
        gameOver = true;
        const won = todaysWord.split("").every(l => guessedLetters.includes(l));
        for (let i = 0; i < todaysWord.length; i++) {
            const tile = document.getElementById("tile-" + i);
            tile.classList.remove("revealed");
            tile.textContent = todaysWord[i];
            tile.classList.add(won ? "revealed-final" : "revealed-fail");
        }
        showMessage(won ? "You got it! 🎯" : "The word was " + todaysWord);
        showShareButton();
    }
}

// ════════════════════════════════════════════════════════════════
// KEYBOARD SUPPORT
// ════════════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const letter = e.key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) handleGuess(letter);
});

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
const todaysEntry = getTodaysWord();
todaysWord = todaysEntry.word;
todaysHint = todaysEntry.hint;
buildTiles();
buildKeyboard();
loadStats();
document.getElementById("word-hint").textContent = "💡 " + todaysHint;
restoreGame();

document.getElementById("wordle-share-btn").addEventListener("click", shareResult);
document.getElementById("wordle-share-x")?.addEventListener("click", () => {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-fb")?.addEventListener("click", () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://www.dartsdaily.net", "_blank");
});
document.getElementById("wordle-share-wa")?.addEventListener("click", () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-reddit")?.addEventListener("click", () => {
    window.open("https://reddit.com/submit?title=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-telegram")?.addEventListener("click", () => {
    window.open("https://t.me/share/url?url=https://www.dartsdaily.net&text=" + encodeURIComponent(buildShareText()), "_blank");
});
