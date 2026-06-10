// Lutherreise — Interaktive Karten für Wartburg & Wittenberg

const { useState: useStateM } = React;

/* ═══════════════════════════════════════════════════════════════
   POINTS OF INTEREST — Wartburg (Eisenach)
   ═══════════════════════════════════════════════════════════════ */
const WM = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
const WB = 'https://www.wartburg.de/';
const WL = WB + 'files/inhalte/wartburg/lage/';
const WT = WB + 'files/inhalte/app/touren/individueller_rundgang/';
const STATION_IMG = 'assets/stations/';
const STATION_AUDIO = 'assets/audio/';

const WARTBURG_POIS = [
  {
    id: 'parkplatz', nr: 'P', x: 9, y: 88,
    titel: 'Parkplatz', untertitel: 'Unterhalb der Wartburg · 24h geöffnet',
    text: 'Kostenpflichtige Stellplätze für Autos, Busse und Motorräder direkt unterhalb der Burg. Vom Parkplatz geht es zu Fuß weiter — entweder über die steile Treppe (kürzester Weg) oder den sanfteren Weg auf der Zufahrtstraße. Burg-Shuttle verfügbar.',
    color: 'brown', icon: 'parking', kind: 'parking',
    foto: STATION_IMG + 'wartburg-parkplatz.jpeg',
  },
  {
    id: 'eingang', nr: 1, x: 22, y: 18,
    titel: 'Torhaus',
    untertitel: 'Eingang zur Wartburg · Zugbrücke',
    text: 'Das im Kern mittelalterliche Torhaus der Wartburg ermöglicht den Zugang zur Burg und verfügt über drei Tore und eine Zugbrücke — der historische Eingang, durch den man seit Jahrhunderten die Festung betritt.',
    color: 'apricot', icon: 'gate',
    foto: STATION_IMG + 'wartburg-torhaus.jpeg',
  },
  {
    id: 'palas', nr: 2, x: 67, y: 38,
    titel: 'Palas — Romanischer Prachtbau',
    untertitel: 'Sängersaal · Festsaal · Elisabethkemenate',
    text: 'Das mittelalterliche Wohn- und Repräsentationsgebäude der Landgrafen von Thüringen. Im Palas befinden sich die Elisabethkemenate, der legendäre Sängersaal und der prachtvolle Festsaal — einer der bekanntesten Konzertsäle Thüringens.',
    color: 'sage', icon: 'palas',
    foto: STATION_IMG + 'wartburg-palas.jpeg',
    audio: { de: STATION_AUDIO + 'wartburg-palas-de.mp3', en: STATION_AUDIO + 'wartburg-palas-en.mp3' },
  },
  {
    id: 'lutherstube', nr: 3, x: 13, y: 23,
    titel: 'Lutherstube ✦',
    untertitel: 'Wo das Neue Testament übersetzt wurde',
    text: 'Luthers Wohngemach während seines Aufenthalts 1521/22 auf der Wartburg. In dieser schlichten Stube übersetzte er als „Junker Jörg" das Neue Testament ins Deutsche. Die Lutherstube ist seit dem 16. Jahrhundert Pilgerziel für Menschen aus aller Welt.',
    color: 'apricot', highlight: true, icon: 'desk',
    foto: STATION_IMG + 'wartburg-lutherstube.jpeg',
    audio: { de: STATION_AUDIO + 'wartburg-lutherstube-de.mp3', en: STATION_AUDIO + 'wartburg-lutherstube-en.mp3' },
  },
  {
    id: 'elisabethkemenate', nr: 4, x: 66, y: 58,
    titel: 'Elisabethkemenate',
    untertitel: 'Glasmosaiken · Heilige Elisabeth',
    text: 'Früher als „Fräulein-Elisabeth-Camin-Stuben" bekannt — vermutlich das mittelalterliche Frauengemach der Wartburg. Das große Glasmosaik an den Wänden zeigt bedeutende Ereignisse aus dem Leben der Heiligen Elisabeth von Thüringen.',
    color: 'rose', icon: 'chapel',
    foto: STATION_IMG + 'wartburg-elisabethkemenate.jpeg',
    audio: { de: STATION_AUDIO + 'wartburg-elisabethkemenate-de.mp3', en: STATION_AUDIO + 'wartburg-elisabethkemenate-en.mp3' },
  },
  {
    id: 'museum', nr: 5, x: 79, y: 39,
    titel: 'Museum',
    untertitel: 'Kunstsammlung der Wartburg',
    text: 'In der Neuen Kemenate — den ehemaligen Gemächern von Großherzog Carl Alexander von Sachsen-Weimar-Eisenach — befindet sich heute die Kunstsammlung der Wartburg mit Werken aus der Cranach-Werkstatt und mittelalterlicher Kunst.',
    color: 'sage', icon: 'frame',
    foto: STATION_IMG + 'wartburg-museum.jpeg',
  },
  {
    id: 'suedturm', nr: 6, x: 72, y: 68,
    titel: 'Südturm',
    untertitel: 'Aussicht · Verließ · 22 m hoch',
    text: 'Der im 14. Jahrhundert errichtete Südturm ist mehr als 22 Meter hoch. Im mittleren Geschoss liegt das „Angstloch" — durch das Gefangene in den Kerker herabgelassen wurden. Wer ganz nach oben steigt, wird mit einem Panoramablick über den Thüringer Wald belohnt.',
    color: 'apricot', icon: 'view',
    foto: STATION_IMG + 'wartburg-suedturm.jpeg',
  },
];

/* ═══════════════════════════════════════════════════════════════
   POINTS OF INTEREST — Wittenberg (Lutherstadt)
   Layout follows real Schlossstraße/Collegienstraße axis (W→E)
   ═══════════════════════════════════════════════════════════════ */
const WITTENBERG_POIS = [
  {
    id: 'parkplatz', nr: 'P', x: 8, y: 38,
    titel: 'Parkplatz Wallstraße',
    untertitel: 'Öffentlicher Parkplatz',
    text: 'Wir parken am Parkplatz Wallstraße in der Lutherstadt Wittenberg. Von dort sind es ~5 Min. zu Fuß zur Schlosskirche.',
    color: 'brown', icon: 'parking', kind: 'parking',
  },
  {
    id: 'schlosskirche', nr: 1, x: 18, y: 58,
    titel: 'Schlosskirche ✦',
    untertitel: 'Tür der 95 Thesen',
    foto: STATION_IMG + 'schloss-wittenberg.jpg',
    text: 'Hier nagelte Luther am 31. Oktober 1517 seine 95 Thesen an die Tür. Die romanisch-gotische Kirche bildet den nördlichen Flügel des Renaissance-Schlosses am Westende der Stadt.',
    color: 'apricot', highlight: true, icon: 'church',
    must: [
      {
        titel: 'Bronzene Thesentür (1858)',
        kurz: 'Die berühmte Tür — Originaltext der 95 Thesen in Latein.',
        warum: 'Die hölzerne Originaltür, an die Luther am 31. Oktober 1517 seine 95 Thesen geschlagen haben soll, verbrannte 1760 im Siebenjährigen Krieg. König Friedrich Wilhelm IV. ließ 1858 zum 375. Geburtstag Luthers eine 2,8 t schwere Bronzetür anfertigen, in die der vollständige lateinische Text aller 95 Thesen eingegossen ist. Sie steht genau an der Stelle des Originals — das Tor gilt seither als Gründungsort der Reformation. Über der Tür wacht ein Mosaik mit dem gekreuzigten Christus, flankiert von Luther und Melanchthon.',
        bild: 'door',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, die Thesentür.jpg?width=480',
      },
      {
        titel: 'Grab Martin Luthers',
        kurz: 'Vor der Kanzel — eine schlichte Bronzeplatte.',
        warum: 'Luther starb am 18. Februar 1546 in seiner Geburtsstadt Eisleben. Auf Wunsch des Kurfürsten Johann Friedrich wurde sein Leichnam nach Wittenberg überführt und in „seiner" Schlosskirche bestattet — direkt unterhalb der Kanzel, von der aus er so oft gepredigt hatte. Eine schlichte Bronzeplatte mit lateinischer Inschrift markiert die Stelle. Kein Prunk, kein Standbild — genau wie er es sich gewünscht hätte. Eine Kerze, ein Innehalten: das ist einer der stillsten und dichtesten Momente der ganzen Reise.',
        bild: 'grave',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, das Grab von Martin Luther.jpg?width=480',
      },
      {
        titel: 'Grab Philipp Melanchthons',
        kurz: 'Gegenüber Luthers Grab.',
        warum: 'Philipp Melanchthon — „Praeceptor Germaniae" (Lehrer Deutschlands) und Luthers engster theologischer Mitstreiter — ruht in derselben Kirche, seinem Freund gegenüber. Er verfasste 1530 das Augsburger Bekenntnis, die wichtigste Bekenntnisschrift der Reformation, und systematisierte Luthers Gedanken zur evangelischen Lehre. Die räumliche Nähe der beiden Gräber ist bis heute ein berührendes Sinnbild ihrer 28-jährigen Freundschaft und ihrer gemeinsamen Arbeit.',
        bild: 'grave2',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, das Grab von Philipp Melanchthon.jpg?width=480',
      },
      {
        titel: 'Standbilder der neun Reformatoren',
        kurz: 'Überlebensgroße Figuren an den Wandpfeilern.',
        warum: 'An den Wandpfeilern des Innenraums stehen überlebensgroße Standbilder von neun führenden Gestalten der Reformation: Martin Luther, Philipp Melanchthon, Johannes Bugenhagen, Georg Spalatin, Justus Jonas, Johannes Brenz, Urbanus Rhegius, Nikolaus von Amsdorf und Caspar Cruciger. Die Figuren wurden nach Entwürfen von Rudolf Siemering von verschiedenen Bildhauern geschaffen. Bei der neugotischen Erneuerung (1883–1892) wurde der Kirchenraum so bewusst zu einer „Ruhmeshalle der Reformation" gestaltet.',
        bild: 'statue1',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, Ludwig Brodwolf, Statue von Johannes Bugenhagen.jpg?width=480',
      },
      {
        titel: 'Gräber der Kurfürsten Friedrich der Weise & Johann',
        kurz: 'Kniende Ritterfiguren & Grabplatten von Peter Vischer.',
        warum: 'Vor dem Hauptaltar sind die sächsischen Kurfürsten Friedrich der Weise und sein Bruder Johann der Beständige (Haus Wettin) beigesetzt. Neben dem Altar stehen zwei noch aus der alten Kirchenausstattung stammende lebensgroße kniende Figuren in Ritterrüstung; ihre künstlerisch wertvollen bronzenen Grabplatten stammen aus der Werkstatt von Peter Vischer und sind im Chorraum angebracht. Friedrich der Weise war es, der Luther nach dem Reichstag zu Worms auf die Wartburg in Sicherheit bringen ließ — ohne seinen Schutz wäre die Reformation kaum denkbar.',
        bild: 'grave',
        foto: WM + 'Schlosskirche Wittenberg - Grabplatte - geo.hlipp.de - 28171.jpg?width=480',
      },
      {
        titel: 'Chorfenster nach Albrecht Dürer',
        kurz: 'Geburt, Kreuzigung, Auferstehung, Pfingsten.',
        warum: 'Die farbigen Glasfenster im Chor wurden nach Motiven aus Holzschnitten Albrecht Dürers gestaltet und zeigen die Geburt Christi, die Kreuzigung, die Auferstehung und das Pfingstwunder — die Kernpunkte des christlichen Heilsgeschehens. Wie der Großteil der heutigen Ausstattung stammen sie aus der neugotischen Neugestaltung am Ende des 19. Jahrhunderts.',
        bild: 'church',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, Bleiglasfenster-1.jpg?width=480',
      },
      {
        titel: 'Neugotischer Altar & Kanzel (1883–1892)',
        kurz: 'Die heutige Ausstattung der Reformationsgedächtniskirche.',
        warum: 'Zum 400. Geburtstag Luthers wurde die Schlosskirche 1883–1892 grundlegend im neugotischen Stil erneuert und zur „Reformationsgedächtniskirche" umgestaltet. Aus dieser Zeit stammt die heutige Innenausstattung — darunter der hohe Altar im Chor und die Kanzel des Wittenberger Bildhauers Wilhelm Löber, die mit den Wappen der Lutherstädte (u. a. Eisleben, Erfurt, Wittenberg) geschmückt ist.',
        bild: 'pulpit',
        foto: WM + 'Lutherstadt Wittenberg, Schlosskirche, der Altar.jpg?width=480',
      },
    ],
  },
  {
    id: 'marktplatz', nr: 2, x: 45, y: 50,
    titel: 'Marktplatz',
    untertitel: 'Mittagspause · Sandwich',
    text: 'Das Herz der Stadt mit den Bronzedenkmälern von Luther und Melanchthon. Hier essen wir Mittag und genießen die Reformator-Stadt-Atmosphäre.',
    color: 'sage', icon: 'market',
    foto: STATION_IMG + 'wittenberg-marktplatz.jpg',
    must: [
      {
        titel: 'Lutherdenkmal (Schadow, 1821)',
        kurz: 'Erstes Reformator-Denkmal Deutschlands.',
        warum: 'Johann Gottfried Schadow schuf 1821 das erste öffentliche Denkmal für einen Bürgerlichen in Deutschland: Luther im Talar, in der Hand die aufgeschlagene Bibel mit seiner deutschen Übersetzung. Der neugotische Baldachin darüber stammt von Karl Friedrich Schinkel. Das Denkmal wurde zum Vorbild für unzählige weitere Reformatoren-Standbilder im ganzen Land — und machte den Marktplatz zur Bühne der großen Lutherjubiläen.',
        bild: 'statue1',
        foto: WM + 'Markt, Lutherdenkmal, Lutherstadt Wittenberg 20180812 009.jpg?width=480',
      },
      {
        titel: 'Melanchthondenkmal (Drake, 1865)',
        kurz: 'Pendant zu Luther — von Friedrich Drake.',
        warum: 'Friedrich Drake schuf das Bronzestandbild Philipp Melanchthons, das dem Lutherdenkmal auf dem Markt gegenübersteht — genau wie sich die beiden Gräber in der Schlosskirche gegenüberliegen. Auch hier überspannt ein neugotischer Baldachin die Figur. Melanchthon hält eine Schriftrolle, ein Hinweis auf das Augsburger Bekenntnis. Zusammen rahmen die beiden Denkmäler den Platz und erzählen von der engen Partnerschaft der Reformatoren.',
        bild: 'statue2',
        foto: WM + 'Statue Marktplatz (Wittenberg) Philipp Melanchthon.jpg?width=480',
      },
      {
        titel: 'Renaissance-Rathaus',
        kurz: 'Schauseite des Marktplatzes.',
        warum: 'Nach einem Stadtbrand in den 1520er Jahren wieder aufgebaut, erhielt das Rathaus seine prächtige Renaissance-Schauseite mit Freitreppe und reich verziertem Portal in den 1570er Jahren. Es ist eines der schönsten Renaissance-Rathäuser Mitteldeutschlands und prägt zusammen mit den beiden Reformatoren-Denkmälern das berühmte Bild des Wittenberger Marktes — Kulisse aller großen Reformationsfeiern.',
        bild: 'rathaus',
        foto: WM + 'Lutherstadt Wittenberg, Marktplatz und Rathaus.jpg?width=480',
      },
    ],
  },
  {
    id: 'stadtkirche', nr: 3, x: 50, y: 65,
    titel: 'Stadtkirche St. Marien',
    untertitel: 'Luthers Predigtkirche',
    text: 'Die „Mutterkirche der Reformation" — hier predigte Luther über 2.000 Mal. Die zwei achteckigen Türme prägen die Stadtsilhouette.',
    color: 'apricot', icon: 'church2',
    foto: STATION_IMG + 'wittenberg-stadtkirche.jpg',
    must: [
      {
        titel: 'Reformations-Altar (Cranach, 1547)',
        kurz: 'Das Reformations-Bild schlechthin.',
        warum: 'Lucas Cranach d.Ä. und sein Sohn schufen den großen Flügelaltar als gemaltes Bekenntnis der Reformation. Die Mitteltafel zeigt das Abendmahl — unter den Jüngern sitzt Luther als „Junker Jörg". Die Seitenflügel zeigen Melanchthon, der tauft, und Stadtpfarrer Johannes Bugenhagen, der die Beichte abnimmt: die drei evangelischen Kernhandlungen. Die Predella darunter zeigt Luther auf der Kanzel, der allein auf den gekreuzigten Christus weist — und unter den Zuhörern hat sich Cranach selbst verewigt. Bild gewordene Theologie.',
        bild: 'altar',
        foto: WM + 'Lucas Cranach d.Ä. - Reformationsaltar, St. Marien zu Wittenberg, Mitteltafel.jpg?width=480',
      },
      {
        titel: 'Taufstein (Hermann Vischer, 1457)',
        kurz: 'Ältestes Stück der Kirche.',
        warum: 'An diesem kunstvollen bronzenen Taufbecken aus der Nürnberger Vischer-Werkstatt wurden alle sechs Kinder Martin und Katharina Luthers getauft — Hans, Elisabeth, Magdalena, Martin, Paul und Margarethe. Die zierlichen gotischen Reliefs mit Heiligenfiguren sind 60 Jahre älter als die Reformation selbst. Wer hier steht, berührt buchstäblich das Familienleben der Luthers.',
        bild: 'font',
        foto: WM + 'Lutherstadt Wittenberg, die Stadtkirche, Taufbecken.jpg?width=480',
      },
      {
        titel: 'Kanzel der Predigtkirche',
        kurz: 'Hier predigte er über 2.000 Mal.',
        warum: 'Die Stadtkirche St. Marien war Luthers eigentliche Predigtkirche — von hier verkündete er über 2.000 Mal das Evangelium und prägte das evangelische Gottesdienstverständnis: die Predigt in der Sprache des Volkes rückt ins Zentrum. Die originale Kanzel aus Luthers Zeit wird heute geschützt im Lutherhaus bewahrt; in der Kirche steht eine spätere. Schaut hinauf und stellt euch vor, wie hier zum ersten Mal Reformation hörbar wurde.',
        bild: 'pulpit',
        foto: WM + 'Lutherstadt Wittenberg, die Stadtkirche, Kanzel.jpg?width=480',
      },
      {
        titel: 'Cranach-Epitaph „Der Weinberg des Herrn"',
        kurz: 'Gemaltes Bekenntnis von Cranach d. J. (1569).',
        warum: 'In der Stadtkirche hängen mehrere Epitaphgemälde aus der Cranach-Werkstatt. Das bekannteste schuf Lucas Cranach der Jüngere 1569 zum Gedenken an den Theologen Paul Eber: „Der Weinberg des Herrn". Das Bild deutet das Gleichnis von den Arbeitern im Weinberg als reformatorische Streitschrift — rechts pflegen die Reformatoren (Luther, Melanchthon u. a.) den Weinberg, links verwüsten ihn die Vertreter der alten Kirche. Ein in Farbe übersetztes Bekenntnis zur Reformation.',
        bild: 'portraits',
        foto: WM + 'Lutherstadt Wittenberg, die Stadtkirche, Epitaph für Paul Eber.jpg?width=480',
      },
      {
        titel: 'Die Orgel',
        kurz: 'Sauer-Orgel von 1983 · 53 Register.',
        warum: 'Die große Orgel wurde 1983 von der Orgelbaufirma Sauer (Frankfurt/Oder) erbaut und besitzt 53 Register auf drei Manualen und Pedal. Sie erinnert an ein Herzstück der Reformation: Luther maß dem gemeinsamen Gesang große Bedeutung bei und dichtete selbst zahlreiche Choräle — darunter „Ein feste Burg ist unser Gott". In St. Marien, seiner Predigtkirche, rückte das deutsche Kirchenlied erstmals mitten in den Gottesdienst.',
        bild: 'church',
        foto: WM + 'Lutherstadt Wittenberg, die Stadtkirche, Orgel.jpg?width=480',
      },
      {
        titel: '„Judensau"-Schmähplastik & Mahnmal',
        kurz: 'Ein dunkles Erbe — heute ein Ort des Gedenkens.',
        warum: 'An der Südostfassade befindet sich eine „Judensau" — eine antisemitische Schmähplastik aus dem Hochmittelalter, um 1305, wie sie an mehreren mittelalterlichen Kirchen zu finden war. Dieses Relief erinnert an die lange Geschichte der Judenfeindschaft innerhalb der christlichen Geschichte. Auch Luther zeigte in seinen späten Schriften eine solche Judenfeindschaft. Seit 1988 ordnet ein Mahnmal von Wieland Schmiedel im Boden darunter das Relief bewusst ein und hält die Erinnerung an die Verfolgung der Juden wach. Es ist kein bloßes „Kunstwerk", sondern eine Mahnung — und ein wichtiger, ehrlicher Halt für jede Führung.',
        bild: 'church',
        foto: WM + 'Lutherstadt Wittenberg, die Stadtkirche, Judensau-Relief.jpg?width=480',
      },
    ],
  },
  {
    id: 'lutherhaus', nr: 4, x: 78, y: 48,
    titel: 'Lutherhaus ✦',
    untertitel: 'Wohn- und Wirkstätte',
    text: 'Das ehemalige Augustinerkloster, in dem Luther 35 Jahre lebte. Heute UNESCO-Welterbe und größtes reformationsgeschichtliches Museum der Welt.',
    color: 'sage', highlight: true, icon: 'house',
    foto: STATION_IMG + 'wittenberg-lutherhaus.jpg',
    must: [
      {
        titel: 'Lutherstube',
        kurz: 'Original-Wohnzimmer der Familie Luther.',
        warum: 'Das Herzstück des Lutherhauses: die holzgetäfelte Stube mit dem großen grünen Kachelofen, in der Luther mit Katharina von Bora und ihren sechs Kindern lebte. Hier saßen die Studenten zu Tisch und schrieben mit, was Luther beim Essen sagte — die berühmten „Tischreden". Die Wandvertäfelung und die bemalte Decke stammen noch aus dem Jahr 1535. Der Raum ist seit fast 500 Jahren praktisch unverändert; in einer Ecke ist sogar noch Käthes Türrahmen mit Luthers eingeritztem Andenken zu sehen.',
        bild: 'stube',
        foto: WM + 'Bundesarchiv Bild 183-19091-0010, Wittenberg, Lutherstube.jpg?width=480',
      },
      {
        titel: 'Cranach-Porträts der Familie',
        kurz: 'Luther, Käthe, Eltern, Kinder.',
        warum: 'Lucas Cranach d.Ä. war Luthers Trauzeuge, Pate seiner Kinder und der Maler, der das Gesicht der Reformation prägte. Im Lutherhaus hängen seine berühmten Bildnisse: Luther als Augustinermönch, als bärtiger „Junker Jörg", das Doppelporträt von Martin und Katharina zur Hochzeit sowie die Eltern Hans und Margarethe Luther. Durch Cranachs in Serie gemalte Porträts wurde Luther zur ersten „medialen" Figur Europas.',
        bild: 'portraits',
        foto: WM + 'Workshop Lucas Cranach d.Ä. - Doppelporträt Martin Luther u. Katharina Bora (Uffizien).jpg?width=480',
      },
      {
        titel: 'Lutherbibel von 1534',
        kurz: 'Erste Vollbibel auf Deutsch.',
        warum: 'Die erste vollständige Ausgabe von Luthers Bibelübersetzung, gedruckt 1534 in Wittenberg — von Hand koloriert und mit Holzschnitten aus Cranachs Werkstatt reich illustriert. Indem Luther „dem Volk aufs Maul schaute", schuf er eine kraftvolle, verständliche deutsche Sprache, die das Hochdeutsche bis heute prägt wie kein anderes Buch. Im Lutherhaus liegt ein kostbares Originalexemplar.',
        bild: 'bible',
        foto: WM + 'Lutherbibel 1534 Hesekiel 37.jpg?width=480',
      },
    ],
  },
  {
    id: 'cranachhof', nr: 5, x: 56, y: 42,
    titel: 'Cranach-Hof',
    untertitel: 'Cranach-Höfe · Druck und Septembertestament',
    text: 'Lucas Cranach d. Ä. war Maler, Unternehmer und enger Weggefährte Luthers. Hier wird sichtbar, wie die Reformation durch Bilder, Druck und Verlagsarbeit zu den Menschen kam.',
    color: 'rose', icon: 'frame',
    foto: WM + 'CranachHof-Markt3-4 1.JPG?width=480',
    must: [
      {
        titel: 'Cranach als Medienpartner',
        kurz: 'Porträts, Bilder, Druck und Öffentlichkeit.',
        warum: 'Lucas Cranach prägte das Gesicht der Reformation: Er malte Luther, übersetzte reformatorische Inhalte in Bilder und war in Druck und Verlag eng eingebunden. Luther predigte und schrieb; Cranach und die Drucker halfen, diese Worte sichtbar und verbreitbar zu machen.',
        bild: 'portraits',
        foto: WM + 'Lucas Cranach d.Ä. - Martin Luther, 1528 (Veste Coburg).jpg?width=480',
      },
      {
        titel: 'Septembertestament (1522)',
        kurz: 'Luthers deutsches Neues Testament.',
        warum: 'Auf der Wartburg übersetzte Luther das Neue Testament ins Deutsche; im September 1522 wurde es in Wittenberg gedruckt und verbreitet. Darum heißt es Septembertestament. Die Übersetzung brachte Gottes Wort aus der Gelehrten- und Priesterwelt in die Hände gewöhnlicher Menschen.',
        bild: 'bible',
        foto: WM + 'Luther Das Newe Testament Deutzsch 015 Initial.jpg?width=480',
      },
      {
        titel: 'Buchdruck als Werkzeug des Evangeliums',
        kurz: 'Nicht nur Technik, sondern Verbreitung des Wortes.',
        warum: 'Die Reformation verbreitete sich nicht nur durch Vorlesungen und Predigten. Gedruckte Flugschriften und Bücher wirkten wie ein Mediennetz der Zeit. Gott gebrauchte Druck, Sprache und Menschen, damit das Evangelium viele Hände und Herzen erreichte.',
        bild: 'bible',
        foto: WM + 'Druckstube Wittenberg.jpg?width=480',
      },
    ],
  },
  {
    id: 'luthereiche', nr: 6, x: 86, y: 66,
    titel: 'Luthereiche ✦',
    untertitel: '10. Dezember 1520 · öffentlicher Bruch mit Rom',
    text: 'Die Luthereiche erinnert an den Ort, an dem Luther die päpstliche Bannandrohungsbulle und kirchliche Rechtsbücher verbrannte — ein öffentliches Bekenntnis, dass Gottes Wort über menschlicher Autorität steht.',
    color: 'sage', highlight: true, icon: 'view',
    foto: WM + 'Luthereiche in Wittenberg.jpg?width=480',
    must: [
      {
        titel: '10. Dezember 1520',
        kurz: 'Verbrennung der Bannandrohungsbulle.',
        warum: 'Luther verbrannte hier die Bannandrohungsbulle Papst Leos X. und kirchliche Rechtsbücher. Das war mehr als Ärger oder Protest: Es war ein öffentliches Bekenntnis, dass päpstliche Anordnung nicht über Gottes Wort stehen kann.',
        bild: 'pulpit',
        foto: WM + 'Pantheon der Deutschen Luther verbrennt Bücher.jpg?width=480',
      },
      {
        titel: 'Was Exkommunikation bedeutete',
        kurz: 'Nicht bloß Ausschluss — reale Gefahr.',
        warum: 'Eine Bannandrohung war im 16. Jahrhundert keine Kleinigkeit. Exkommunikation bedeutete den Verlust von Schutz, den Verdacht der Häresie und im Extremfall Lebensgefahr. Luther wusste, welchen Weg er betrat; seine Kühnheit kam nicht aus Furchtlosigkeit, sondern daraus, dass Gottes Wort größer war als seine Angst.',
        bild: 'grave',
        foto: WM + 'Raphael - Pope Leo X with two cardinals (cropped).jpg?width=480',
      },
      {
        titel: 'Gewissen vor Gott',
        kurz: 'Der Weg nach Worms beginnt sichtbar.',
        warum: 'Die Luthereiche erinnert an den öffentlichen Bruch mit Rom. Wenn die 95 Thesen den Streit eröffneten, zeigte diese Verbrennung, dass Luther nicht mehr zurück konnte. Dieser Weg führte bald zum Reichstag zu Worms, wo er vor Kaiser und Reich bei seinem Gewissen blieb.',
        bild: 'reichstag',
        foto: WM + 'Anton von Werner Luther vor dem Reichstag zu Worms Entwurf 1870.jpg?width=480',
      },
    ],
  },
  {
    id: 'panorama', nr: 7, x: 76, y: 20,
    titel: 'Luther 1517 — 360°',
    untertitel: 'Asisi Panorama · Arsenalplatz',
    text: 'Das spektakuläre 360°-Panorama von Yadegar Asisi versetzt uns mitten ins Wittenberg von 1517. Eine Zeitreise durch eine Stadt im Aufbruch!',
    color: 'rose', icon: 'panorama',
    foto: STATION_IMG + 'wittenberg-panorama.jpg',
  },
  {
    id: 'melanchthon', nr: 8, x: 64, y: 62,
    titel: 'Melanchthonhaus',
    untertitel: 'Optional · Freizeit · Collegienstr. 60',
    text: 'Das Wohnhaus von Philipp Melanchthon, Luthers engstem Mitstreiter. Klein, aber wunderschön erhalten — UNESCO-Welterbe.',
    color: 'apricot', icon: 'house2',
    foto: STATION_IMG + 'wittenberg-melanchthonhaus.jpg',
  },
];

/* ═══════════════════════════════════════════════════════════════
   Realistische Mini-Illustrationen für POI-Karten und Must-Sees
   (alle hand-drawn SVGs, dezent koloriert)
   ═══════════════════════════════════════════════════════════════ */
function PoiIllustration({ icon, color }) {
  const fillC = { apricot: '#F4C7A1', sage: '#A8C3A0', rose: '#E8A4A4', brown: '#D4B896' }[color] || '#F4C7A1';
  const ink = '#6B4423';

  const wrap = (children) => (
    <svg viewBox="0 0 240 150" width="100%" height="100%" style={{ display: 'block' }} preserveAspectRatio="xMidYMid slice">
      {/* sky/paper */}
      <defs>
        <linearGradient id={`sky-${icon}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F8E8D0" />
        </linearGradient>
      </defs>
      <rect width="240" height="150" fill={`url(#sky-${icon})`} />
      {children}
    </svg>
  );

  switch (icon) {
    case 'parking':
      return wrap(<g>
        <rect x="40" y="40" width="160" height="80" fill="#D4B896" stroke={ink} strokeWidth="1.5" />
        <text x="120" y="98" textAnchor="middle" fontSize="64" fill="#fff" fontFamily="serif" fontWeight="700" stroke={ink} strokeWidth="1.5">P</text>
        {/* parking lines */}
        <line x1="60" y1="40" x2="60" y2="120" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
        <line x1="180" y1="40" x2="180" y2="120" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
        {/* trees flanking */}
        <circle cx="22" cy="100" r="14" fill="#7FA177" stroke={ink} strokeWidth="1" />
        <rect x="20" y="110" width="4" height="14" fill={ink} />
        <circle cx="218" cy="100" r="12" fill="#7FA177" stroke={ink} strokeWidth="1" />
        <rect x="216" y="108" width="4" height="14" fill={ink} />
      </g>);

    case 'gate':
      return wrap(<g>
        {/* castle wall behind */}
        <path d="M 0 130 L 0 70 L 40 60 L 80 65 L 120 50 L 160 55 L 200 65 L 240 60 L 240 130 Z" fill={fillC} stroke={ink} strokeWidth="1.5" />
        {/* crenellations */}
        <g fill={fillC} stroke={ink} strokeWidth="1">
          <rect x="40" y="55" width="8" height="8" />
          <rect x="60" y="55" width="8" height="8" />
          <rect x="80" y="55" width="8" height="8" />
          <rect x="160" y="55" width="8" height="8" />
          <rect x="180" y="55" width="8" height="8" />
        </g>
        {/* gate tower */}
        <rect x="100" y="40" width="50" height="90" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        <rect x="96" y="34" width="58" height="8" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <path d="M 100 34 L 125 18 L 150 34" fill="#7FA177" stroke={ink} strokeWidth="1.2" />
        {/* gate arch */}
        <path d="M 113 130 L 113 95 Q 125 82 137 95 L 137 130" fill="#3D2817" stroke={ink} strokeWidth="1.2" />
        {/* drawbridge chains */}
        <line x1="105" y1="60" x2="113" y2="95" stroke={ink} strokeWidth="1" />
        <line x1="145" y1="60" x2="137" y2="95" stroke={ink} strokeWidth="1" />
        {/* small window */}
        <rect x="118" y="60" width="14" height="16" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
      </g>);

    case 'palas':
      return wrap(<g>
        <path d="M 0 130 Q 30 125 60 128 Q 120 122 180 128 Q 210 130 240 128 L 240 150 L 0 150 Z" fill="#A8C3A0" opacity="0.4" />
        <rect x="30" y="60" width="180" height="70" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        <path d="M 25 60 L 120 22 L 215 60" fill="#E8A878" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        {/* roof tiles */}
        <line x1="60" y1="50" x2="65" y2="42" stroke={ink} strokeWidth="0.6" opacity="0.5" />
        <line x1="100" y1="38" x2="105" y2="30" stroke={ink} strokeWidth="0.6" opacity="0.5" />
        <line x1="140" y1="38" x2="135" y2="30" stroke={ink} strokeWidth="0.6" opacity="0.5" />
        {/* arched windows top row */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <path d={`M ${50 + i * 32} 84 L ${50 + i * 32} 74 Q ${58 + i * 32} 66 ${66 + i * 32} 74 L ${66 + i * 32} 84 Z`} fill="#FFFBF0" stroke={ink} strokeWidth="1" />
            <line x1={58 + i * 32} y1="68" x2={58 + i * 32} y2="84" stroke={ink} strokeWidth="0.6" />
          </g>
        ))}
        {/* lower windows */}
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={50 + i * 32} y="100" width="16" height="20" fill="#FFFBF0" stroke={ink} strokeWidth="1" />
        ))}
        {/* flag */}
        <line x1="120" y1="22" x2="120" y2="6" stroke={ink} strokeWidth="1" />
        <path d="M 120 6 L 134 11 L 120 16 Z" fill="#E8A4A4" stroke={ink} strokeWidth="0.6" />
      </g>);

    case 'desk':
      return wrap(<g>
        {/* room walls */}
        <rect x="0" y="0" width="240" height="150" fill="#FBF2E0" />
        {/* wood paneling */}
        <g stroke={ink} strokeWidth="0.5" opacity="0.4">
          <line x1="0" y1="100" x2="240" y2="100" />
          <line x1="40" y1="100" x2="40" y2="150" />
          <line x1="80" y1="100" x2="80" y2="150" />
          <line x1="160" y1="100" x2="160" y2="150" />
          <line x1="200" y1="100" x2="200" y2="150" />
        </g>
        {/* window with leaded glass */}
        <rect x="170" y="20" width="50" height="60" fill="#AED6F1" opacity="0.3" stroke={ink} strokeWidth="1.5" />
        <line x1="195" y1="20" x2="195" y2="80" stroke={ink} strokeWidth="0.8" />
        <line x1="170" y1="50" x2="220" y2="50" stroke={ink} strokeWidth="0.8" />
        <line x1="180" y1="35" x2="210" y2="35" stroke={ink} strokeWidth="0.4" />
        <line x1="180" y1="65" x2="210" y2="65" stroke={ink} strokeWidth="0.4" />
        {/* desk */}
        <rect x="40" y="95" width="100" height="8" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        <rect x="46" y="103" width="4" height="36" fill={ink} />
        <rect x="130" y="103" width="4" height="36" fill={ink} />
        {/* open book */}
        <path d="M 60 92 Q 80 88 100 92 Q 120 88 130 92 L 130 96 Q 120 92 100 96 Q 80 92 60 96 Z" fill="#FFFDF7" stroke={ink} strokeWidth="1" />
        <line x1="95" y1="90" x2="95" y2="96" stroke={ink} strokeWidth="0.5" />
        {/* quill */}
        <path d="M 105 95 L 130 60 Q 132 65 130 70 L 110 100 Z" fill="#FFFDF7" stroke={ink} strokeWidth="0.8" />
        <path d="M 110 95 Q 118 80 128 64" fill="none" stroke={ink} strokeWidth="0.4" opacity="0.6" />
        {/* inkpot */}
        <rect x="140" y="92" width="8" height="6" fill={ink} />
        <ellipse cx="144" cy="92" rx="4" ry="1" fill="#3D2817" />
        {/* sparkle */}
        <text x="20" y="40" fontSize="14" fill="#E8A878">✦</text>
      </g>);

    case 'chapel':
      return wrap(<g>
        {/* ground */}
        <rect x="0" y="120" width="240" height="30" fill="#A8C3A0" opacity="0.5" />
        {/* chapel */}
        <rect x="80" y="65" width="80" height="55" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* roof */}
        <path d="M 75 65 L 120 30 L 165 65" fill="#E8A878" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="90" y1="55" x2="95" y2="48" stroke={ink} strokeWidth="0.5" opacity="0.5" />
        <line x1="115" y1="40" x2="120" y2="34" stroke={ink} strokeWidth="0.5" opacity="0.5" />
        {/* cross */}
        <line x1="120" y1="14" x2="120" y2="32" stroke={ink} strokeWidth="2" />
        <line x1="113" y1="20" x2="127" y2="20" stroke={ink} strokeWidth="2" />
        {/* arched door */}
        <path d="M 110 120 L 110 88 Q 120 78 130 88 L 130 120 Z" fill="#3D2817" stroke={ink} strokeWidth="1.2" />
        {/* round window */}
        <circle cx="120" cy="65" r="6" fill="#E8A4A4" stroke={ink} strokeWidth="0.8" />
        {/* side windows */}
        <rect x="86" y="80" width="10" height="20" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        <rect x="144" y="80" width="10" height="20" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
      </g>);

    case 'frame':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* gallery floor line */}
        <line x1="0" y1="120" x2="240" y2="120" stroke={ink} strokeWidth="0.5" opacity="0.4" />
        {/* big frame */}
        <rect x="20" y="20" width="80" height="90" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        <rect x="26" y="26" width="68" height="78" fill="#FBF2E0" />
        {/* portrait silhouette inside */}
        <ellipse cx="60" cy="56" rx="14" ry="16" fill="#E8A878" stroke={ink} strokeWidth="0.8" />
        <path d="M 40 100 Q 60 70 80 100 Z" fill="#3D2817" stroke={ink} strokeWidth="0.8" />
        {/* second frame */}
        <rect x="120" y="35" width="100" height="70" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        <rect x="126" y="41" width="88" height="58" fill={fillC} />
        {/* landscape inside */}
        <path d="M 130 80 L 145 65 L 160 75 L 180 60 L 200 70 L 210 65 L 210 95 L 130 95 Z" fill="#7FA177" />
        <circle cx="200" cy="55" r="6" fill="#E8A878" />
        {/* visitor silhouette */}
        <circle cx="108" cy="100" r="3" fill={ink} />
        <rect x="105" y="103" width="6" height="14" fill={ink} />
      </g>);

    case 'view':
      return wrap(<g>
        {/* sky */}
        <rect x="0" y="0" width="240" height="100" fill="#AED6F1" opacity="0.3" />
        {/* sun */}
        <circle cx="190" cy="34" r="14" fill="#E8A878" />
        {/* layered hills */}
        <path d="M 0 90 Q 50 70 100 80 Q 150 65 200 78 Q 220 82 240 78 L 240 150 L 0 150 Z" fill="#7FA177" opacity="0.45" stroke={ink} strokeWidth="0.8" />
        <path d="M 0 105 Q 60 95 120 102 Q 180 92 240 100 L 240 150 L 0 150 Z" fill="#7FA177" opacity="0.65" stroke={ink} strokeWidth="0.8" />
        <path d="M 0 122 Q 80 115 160 122 Q 200 124 240 120 L 240 150 L 0 150 Z" fill="#7FA177" opacity="0.85" />
        {/* trees on near hill */}
        {[20, 50, 80, 130, 170, 200, 225].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={130 + (i % 2) * 4} r="4" fill="#5C7F54" />
          </g>
        ))}
        {/* tower silhouette in front */}
        <rect x="20" y="60" width="14" height="65" fill={ink} opacity="0.7" />
        <path d="M 18 60 L 27 50 L 36 60" fill={ink} opacity="0.7" />
      </g>);

    /* ── Wittenberg ───────────────────────────── */
    case 'church':
      return wrap(<g>
        <rect x="0" y="120" width="240" height="30" fill="#A8C3A0" opacity="0.5" />
        {/* castle complex behind */}
        <rect x="20" y="80" width="200" height="40" fill="#F4C7A1" stroke={ink} strokeWidth="1.2" opacity="0.85" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={28 + i * 24} y={92} width="10" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.6" />
        ))}
        {/* big iconic round tower with crown */}
        <rect x="100" y="38" width="40" height="82" fill="#F4C7A1" stroke={ink} strokeWidth="1.5" />
        {/* crown ring (kaiserkrone) */}
        <rect x="94" y="32" width="52" height="8" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <path d="M 100 32 L 105 22 L 110 32 L 115 22 L 120 32 L 125 22 L 130 32 L 135 22 L 140 32" fill="none" stroke={ink} strokeWidth="1.2" strokeLinejoin="miter" />
        <path d="M 100 32 L 105 22 L 110 32 L 115 22 L 120 32 L 125 22 L 130 32 L 135 22 L 140 32 Z" fill="#E8A878" stroke={ink} strokeWidth="1" />
        {/* tower window slits */}
        <rect x="108" y="55" width="6" height="14" fill="#3D2817" />
        <rect x="126" y="55" width="6" height="14" fill="#3D2817" />
        <rect x="117" y="90" width="6" height="14" fill="#3D2817" />
        {/* the famous door with bronze plate */}
        <rect x="60" y="92" width="14" height="28" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        <rect x="62" y="96" width="10" height="22" fill="#E8A878" />
        <text x="67" y="112" textAnchor="middle" fontSize="8" fill={ink} fontFamily="serif" fontWeight="700">95</text>
      </g>);

    case 'church2':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#A8C3A0" opacity="0.5" />
        {/* nave */}
        <rect x="50" y="65" width="140" height="60" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        <path d="M 48 65 L 120 38 L 192 65" fill="#E8A878" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        {/* twin octagonal towers */}
        <rect x="58" y="40" width="24" height="85" fill={fillC} stroke={ink} strokeWidth="1.5" />
        <rect x="158" y="40" width="24" height="85" fill={fillC} stroke={ink} strokeWidth="1.5" />
        {/* bell roofs (onion-ish) */}
        <path d="M 56 40 Q 70 18 84 40" fill="#7FA177" stroke={ink} strokeWidth="1.2" />
        <path d="M 156 40 Q 170 18 184 40" fill="#7FA177" stroke={ink} strokeWidth="1.2" />
        <line x1="70" y1="14" x2="70" y2="22" stroke={ink} strokeWidth="1" />
        <line x1="170" y1="14" x2="170" y2="22" stroke={ink} strokeWidth="1" />
        {/* tower windows */}
        <rect x="65" y="60" width="10" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        <rect x="165" y="60" width="10" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        <rect x="65" y="85" width="10" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        <rect x="165" y="85" width="10" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        {/* rose window */}
        <circle cx="120" cy="55" r="9" fill="#E8A4A4" stroke={ink} strokeWidth="1" />
        <line x1="111" y1="55" x2="129" y2="55" stroke={ink} strokeWidth="0.6" />
        <line x1="120" y1="46" x2="120" y2="64" stroke={ink} strokeWidth="0.6" />
        {/* main door */}
        <path d="M 110 125 L 110 95 Q 120 84 130 95 L 130 125 Z" fill="#3D2817" stroke={ink} strokeWidth="1.2" />
        {/* nave windows */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <path d={`M ${88 + i * 22} 110 L ${88 + i * 22} 80 Q ${94 + i * 22} 72 ${100 + i * 22} 80 L ${100 + i * 22} 110 Z`} fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
          </g>
        ))}
      </g>);

    case 'house':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#D4B896" opacity="0.5" />
        {/* main building */}
        <rect x="20" y="50" width="200" height="75" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* gable ornate top */}
        <path d="M 16 50 L 22 28 L 36 28 L 42 38 L 56 38 L 62 28 L 76 28 L 82 50 Z" fill="#E8A878" stroke={ink} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 158 50 L 164 28 L 178 28 L 184 38 L 198 38 L 204 28 L 218 28 L 224 50 Z" fill="#E8A878" stroke={ink} strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="82" y="34" width="76" height="16" fill="#E8A878" stroke={ink} strokeWidth="1.2" />
        {/* windows in gable */}
        <rect x="44" y="38" width="8" height="10" fill="#3D2817" />
        <rect x="186" y="38" width="8" height="10" fill="#3D2817" />
        <rect x="116" y="36" width="10" height="12" fill="#3D2817" />
        {/* main rows of windows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`r1-${i}`} x={32 + i * 26} y={62} width="14" height="18" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`r2-${i}`} x={32 + i * 26} y={88} width="14" height="18" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        ))}
        {/* window crosses */}
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={`c-${i}`} stroke={ink} strokeWidth="0.5" opacity="0.6">
            <line x1={39 + i * 26} y1="62" x2={39 + i * 26} y2="80" />
            <line x1={32 + i * 26} y1="71" x2={46 + i * 26} y2="71" />
          </g>
        ))}
        {/* katharinen-portal (famous arched stone portal) */}
        <path d="M 110 125 L 110 102 Q 120 92 130 102 L 130 125 Z" fill="#8B6F47" stroke={ink} strokeWidth="1.2" />
        <path d="M 105 102 Q 120 86 135 102" fill="none" stroke={ink} strokeWidth="1.2" />
        <circle cx="120" cy="95" r="2" fill="#E8A4A4" />
      </g>);

    case 'house2':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#D4B896" opacity="0.5" />
        <rect x="50" y="55" width="140" height="70" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* stepped gable */}
        <path d="M 50 55 L 50 38 L 70 38 L 70 28 L 90 28 L 90 18 L 150 18 L 150 28 L 170 28 L 170 38 L 190 38 L 190 55 Z" fill={fillC} stroke={ink} strokeWidth="1.2" strokeLinejoin="miter" />
        {/* small window in gable */}
        <rect x="115" y="26" width="10" height="14" fill="#3D2817" />
        {/* windows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={64 + i * 32} y={68} width="14" height="18" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`b-${i}`} x={64 + i * 32} y={94} width="14" height="18" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        ))}
        <rect x="110" y="105" width="20" height="20" fill="#3D2817" />
      </g>);

    case 'market':
      return wrap(<g>
        {/* paving */}
        <rect x="0" y="100" width="240" height="50" fill="#D4B896" opacity="0.4" />
        <g stroke={ink} strokeWidth="0.4" opacity="0.3">
          <line x1="0" y1="120" x2="240" y2="120" />
          <line x1="0" y1="135" x2="240" y2="135" />
          {[40, 80, 120, 160, 200].map(x => <line key={x} x1={x} y1="100" x2={x} y2="150" />)}
        </g>
        {/* rathaus in background */}
        <rect x="20" y="40" width="200" height="60" fill="#FBF2E0" stroke={ink} strokeWidth="1.2" opacity="0.95" />
        <path d="M 16 40 L 36 18 L 56 40" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <path d="M 184 40 L 204 18 L 224 40" fill="#E8A878" stroke={ink} strokeWidth="1" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={36 + i * 24} y={56} width="12" height="14" fill="#FFFBF0" stroke={ink} strokeWidth="0.6" />
        ))}
        <rect x="110" y="78" width="20" height="22" fill="#3D2817" />
        {/* Luther statue */}
        <rect x="58" y="100" width="20" height="14" fill="#FBF2E0" stroke={ink} strokeWidth="1" />
        <rect x="64" y="74" width="8" height="26" fill={ink} />
        <circle cx="68" cy="70" r="5" fill={ink} />
        {/* cape */}
        <path d="M 60 80 Q 68 78 76 80 L 76 96 L 60 96 Z" fill={ink} />
        {/* book */}
        <rect x="62" y="86" width="6" height="4" fill="#E8A4A4" />
        {/* Melanchthon statue */}
        <rect x="162" y="100" width="20" height="14" fill="#FBF2E0" stroke={ink} strokeWidth="1" />
        <rect x="168" y="76" width="8" height="24" fill={ink} />
        <circle cx="172" cy="72" r="5" fill={ink} />
        <path d="M 164 82 Q 172 80 180 82 L 180 96 L 164 96 Z" fill={ink} />
      </g>);

    case 'panorama':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#3D2817" />
        {/* curved horizon panorama */}
        <path d="M 0 100 Q 60 75 120 80 Q 180 78 240 100 L 240 150 L 0 150 Z" fill="#F4C7A1" />
        {/* houses in row */}
        {[20, 50, 78, 108, 138, 168, 200].map((x, i) => (
          <g key={i}>
            <rect x={x} y={80 + (i % 2) * 6} width="20" height={28 - (i % 2) * 4} fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
            <path d={`M ${x - 2} ${80 + (i % 2) * 6} L ${x + 10} ${68 + (i % 2) * 6} L ${x + 22} ${80 + (i % 2) * 6}`} fill="#E8A878" stroke={ink} strokeWidth="0.6" />
          </g>
        ))}
        {/* church tower */}
        <rect x="118" y="44" width="14" height="42" fill={fillC} stroke={ink} strokeWidth="1" />
        <path d="M 116 44 Q 125 26 134 44" fill="#7FA177" />
        {/* 360° text */}
        <text x="120" y="35" textAnchor="middle" fontSize="14" fill="#FFFDF7" fontFamily="monospace" fontWeight="700" letterSpacing="2">360°</text>
        <circle cx="120" cy="22" r="3" fill="#E8A878" />
      </g>);

    /* ── Must-see detail illustrations ───────── */
    case 'door':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F4C7A1" />
        {/* stone arch */}
        <path d="M 60 130 L 60 50 Q 120 12 180 50 L 180 130 Z" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* bronze door */}
        <path d="M 70 128 L 70 56 Q 120 22 170 56 L 170 128 Z" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        {/* split */}
        <line x1="120" y1="22" x2="120" y2="128" stroke={ink} strokeWidth="1.5" />
        {/* engraved theses lines */}
        <g stroke="#3D2817" strokeWidth="0.4" opacity="0.7">
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={i}>
              <line x1="78" y1={60 + i * 5} x2="116" y2={60 + i * 5} />
              <line x1="124" y1={60 + i * 5} x2="162" y2={60 + i * 5} />
            </g>
          ))}
        </g>
        {/* hammer + nail glint */}
        <text x="120" y="44" textAnchor="middle" fontSize="14" fill="#E8A4A4">✦</text>
      </g>);

    case 'grave':
    case 'grave2':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* stone floor */}
        <rect x="0" y="100" width="240" height="50" fill="#D4B896" />
        <g stroke={ink} strokeWidth="0.4" opacity="0.4">
          <line x1="60" y1="100" x2="60" y2="150" />
          <line x1="180" y1="100" x2="180" y2="150" />
          <line x1="0" y1="125" x2="240" y2="125" />
        </g>
        {/* bronze plate (in floor) */}
        <rect x="60" y="105" width="120" height="38" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        <text x="120" y="124" textAnchor="middle" fontSize="11" fill="#3D2817" fontFamily="serif" fontStyle="italic" fontWeight="600">
          {icon === 'grave' ? 'D. Martinus Lutherus' : 'Philippus Melanchthon'}
        </text>
        <text x="120" y="138" textAnchor="middle" fontSize="8" fill="#3D2817" fontFamily="serif" letterSpacing="1">
          {icon === 'grave' ? '1483 — 1546' : '1497 — 1560'}
        </text>
        {/* candle */}
        <rect x="35" y="80" width="6" height="20" fill="#FFFDF7" stroke={ink} strokeWidth="0.6" />
        <path d="M 38 80 Q 40 74 38 70 Q 36 74 38 80" fill="#E8A878" />
        <rect x="32" y="100" width="12" height="3" fill="#8B6F47" />
        {/* shaft of light from above */}
        <path d="M 80 0 L 100 100 L 200 100 L 220 0 Z" fill="#FFFBF0" opacity="0.25" />
      </g>);

    case 'statue1':
    case 'statue2':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#D4B896" opacity="0.5" />
        {/* sky */}
        <rect x="0" y="0" width="240" height="125" fill="#AED6F1" opacity="0.2" />
        {/* canopy / baldachin */}
        <path d="M 80 30 L 80 20 L 160 20 L 160 30 L 150 32 L 150 70 L 90 70 L 90 32 Z" fill="#FBF2E0" stroke={ink} strokeWidth="1" opacity="0.85" />
        <path d="M 80 30 L 160 30" stroke={ink} strokeWidth="1.5" />
        {/* plinth */}
        <rect x="100" y="110" width="40" height="15" fill="#FBF2E0" stroke={ink} strokeWidth="1" />
        <rect x="105" y="100" width="30" height="10" fill="#F4C7A1" stroke={ink} strokeWidth="1" />
        {/* statue body */}
        <rect x="113" y="55" width="14" height="50" fill="#5C7F54" stroke={ink} strokeWidth="1" />
        <circle cx="120" cy="50" r="8" fill="#5C7F54" stroke={ink} strokeWidth="1" />
        {/* cape spread */}
        <path d="M 100 64 Q 120 60 140 64 L 140 102 L 100 102 Z" fill="#5C7F54" stroke={ink} strokeWidth="1" />
        {/* book or scroll */}
        {icon === 'statue1' ? (
          <rect x="106" y="76" width="12" height="10" fill="#E8A4A4" stroke={ink} strokeWidth="0.8" />
        ) : (
          <rect x="124" y="76" width="14" height="6" fill="#FFFDF7" stroke={ink} strokeWidth="0.8" />
        )}
      </g>);

    case 'rathaus':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#D4B896" opacity="0.5" />
        <rect x="20" y="40" width="200" height="85" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* arcade ground floor */}
        {[0, 1, 2, 3, 4].map(i => (
          <path key={i} d={`M ${30 + i * 38} 125 L ${30 + i * 38} 100 Q ${49 + i * 38} 90 ${68 + i * 38} 100 L ${68 + i * 38} 125 Z`} fill="#FBF2E0" stroke={ink} strokeWidth="1" />
        ))}
        {/* renaissance gable */}
        <path d="M 50 40 L 50 22 Q 50 14 60 14 L 75 14 Q 85 14 85 22 L 85 40 Z" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <path d="M 155 40 L 155 22 Q 155 14 165 14 L 180 14 Q 190 14 190 22 L 190 40 Z" fill="#E8A878" stroke={ink} strokeWidth="1" />
        {/* center oriel */}
        <rect x="105" y="20" width="30" height="20" fill="#F4C7A1" stroke={ink} strokeWidth="1" />
        <path d="M 100 20 L 120 8 L 140 20" fill="#7FA177" stroke={ink} strokeWidth="1" />
        {/* upper windows */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect key={i} x={32 + i * 28} y={56} width="14" height="20" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect key={`b-${i}`} x={186 + 0} y={0} width="0" height="0" fill="none" />
        ))}
        {/* clock */}
        <circle cx="120" cy="50" r="5" fill="#FFFBF0" stroke={ink} strokeWidth="0.8" />
        <line x1="120" y1="50" x2="120" y2="46" stroke={ink} strokeWidth="0.6" />
        <line x1="120" y1="50" x2="123" y2="50" stroke={ink} strokeWidth="0.6" />
      </g>);

    case 'altar':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* triptych frame */}
        <rect x="20" y="20" width="200" height="100" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        <rect x="26" y="26" width="58" height="88" fill="#FBF2E0" stroke={ink} strokeWidth="0.8" />
        <rect x="90" y="26" width="60" height="88" fill="#FBF2E0" stroke={ink} strokeWidth="0.8" />
        <rect x="156" y="26" width="58" height="88" fill="#FBF2E0" stroke={ink} strokeWidth="0.8" />
        {/* left panel: baptism */}
        <circle cx="55" cy="55" r="8" fill="#E8A878" stroke={ink} strokeWidth="0.6" />
        <rect x="48" y="62" width="14" height="30" fill="#5C7F54" stroke={ink} strokeWidth="0.6" />
        <ellipse cx="55" cy="100" rx="14" ry="3" fill="#AED6F1" stroke={ink} strokeWidth="0.6" />
        {/* center: last supper — long table */}
        <rect x="92" y="80" width="56" height="6" fill="#FBF2E0" stroke={ink} strokeWidth="0.8" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <circle cx={98 + i * 12} cy={68} r="4" fill="#E8A878" stroke={ink} strokeWidth="0.5" />
            <rect x={94 + i * 12} y={72} width="8" height="10" fill="#5C7F54" stroke={ink} strokeWidth="0.4" />
          </g>
        ))}
        <text x="120" y="100" textAnchor="middle" fontSize="6" fill={ink} fontFamily="serif">Abendmahl</text>
        {/* right panel: confession */}
        <circle cx="185" cy="55" r="6" fill="#E8A878" stroke={ink} strokeWidth="0.5" />
        <rect x="180" y="60" width="10" height="22" fill="#3D2817" />
        <circle cx="170" cy="62" r="6" fill="#E8A878" stroke={ink} strokeWidth="0.5" />
        <rect x="165" y="68" width="10" height="22" fill="#5C7F54" />
        {/* predella */}
        <rect x="20" y="120" width="200" height="0" fill="none" />
      </g>);

    case 'font':
      return wrap(<g>
        <rect x="0" y="125" width="240" height="25" fill="#D4B896" opacity="0.5" />
        <rect x="0" y="0" width="240" height="125" fill="#FBF2E0" />
        {/* baptismal font */}
        <ellipse cx="120" cy="58" rx="42" ry="10" fill="#8B6F47" stroke={ink} strokeWidth="1.2" />
        <path d="M 78 58 Q 78 90 90 102 L 150 102 Q 162 90 162 58" fill="#8B6F47" stroke={ink} strokeWidth="1.2" />
        <ellipse cx="120" cy="58" rx="38" ry="8" fill="#3D2817" />
        {/* base */}
        <rect x="100" y="102" width="40" height="8" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        <rect x="90" y="110" width="60" height="14" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        {/* relief details */}
        <g stroke={ink} strokeWidth="0.5" opacity="0.7">
          <line x1="92" y1="75" x2="148" y2="75" />
          <circle cx="100" cy="82" r="4" fill="none" />
          <circle cx="120" cy="82" r="4" fill="none" />
          <circle cx="140" cy="82" r="4" fill="none" />
        </g>
        {/* lid handle */}
        <line x1="120" y1="30" x2="120" y2="50" stroke={ink} strokeWidth="1.2" />
        <circle cx="120" cy="28" r="3" fill="#E8A878" stroke={ink} strokeWidth="0.6" />
      </g>);

    case 'pulpit':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* pillar */}
        <rect x="40" y="0" width="20" height="150" fill="#FBF2E0" stroke={ink} strokeWidth="1" />
        {/* pulpit attached to pillar */}
        <path d="M 60 50 L 130 50 Q 145 60 145 75 L 145 100 L 60 100 Z" fill="#8B6F47" stroke={ink} strokeWidth="1.5" />
        {/* sounding board (canopy) */}
        <path d="M 55 30 L 150 30 L 145 48 L 60 48 Z" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <line x1="100" y1="20" x2="100" y2="30" stroke={ink} strokeWidth="0.8" />
        {/* stair down */}
        <path d="M 145 100 L 200 130 L 200 150 L 60 150 L 60 100 Z" fill="#8B6F47" stroke={ink} strokeWidth="1.2" />
        {/* relief carving panels */}
        <rect x="74" y="62" width="20" height="28" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        <rect x="100" y="62" width="20" height="28" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        <rect x="126" y="62" width="14" height="28" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        {/* book on pulpit */}
        <rect x="92" y="40" width="20" height="10" fill="#E8A4A4" stroke={ink} strokeWidth="0.8" />
      </g>);

    case 'stube':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F4C7A1" />
        {/* wood floor planks */}
        <rect x="0" y="120" width="240" height="30" fill="#8B6F47" />
        <g stroke={ink} strokeWidth="0.5" opacity="0.5">
          <line x1="40" y1="120" x2="40" y2="150" />
          <line x1="100" y1="120" x2="100" y2="150" />
          <line x1="160" y1="120" x2="160" y2="150" />
        </g>
        {/* ceiling beams */}
        <g stroke={ink} strokeWidth="2" opacity="0.6">
          <line x1="0" y1="20" x2="240" y2="20" />
          <line x1="60" y1="0" x2="60" y2="20" />
          <line x1="120" y1="0" x2="120" y2="20" />
          <line x1="180" y1="0" x2="180" y2="20" />
        </g>
        {/* tile stove (Kachelofen) */}
        <rect x="20" y="40" width="50" height="80" fill="#5C7F54" stroke={ink} strokeWidth="1.5" />
        {/* tile pattern */}
        <g stroke={ink} strokeWidth="0.6" opacity="0.7">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 2 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={28 + c * 18} y={48 + r * 18} width="14" height="14" fill="none" />
            ))
          )}
        </g>
        <rect x="32" y="100" width="26" height="14" fill="#3D2817" stroke={ink} strokeWidth="1" />
        {/* table */}
        <rect x="100" y="80" width="100" height="6" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        <rect x="106" y="86" width="4" height="34" fill="#8B6F47" stroke={ink} strokeWidth="0.8" />
        <rect x="190" y="86" width="4" height="34" fill="#8B6F47" stroke={ink} strokeWidth="0.8" />
        {/* bench */}
        <rect x="105" y="98" width="90" height="4" fill="#8B6F47" stroke={ink} strokeWidth="0.8" />
        {/* book on table */}
        <rect x="120" y="74" width="22" height="6" fill="#E8A4A4" stroke={ink} strokeWidth="0.8" />
        {/* window (leaded) */}
        <rect x="160" y="35" width="50" height="40" fill="#AED6F1" opacity="0.4" stroke={ink} strokeWidth="1.5" />
        <line x1="185" y1="35" x2="185" y2="75" stroke={ink} strokeWidth="0.8" />
        <line x1="160" y1="55" x2="210" y2="55" stroke={ink} strokeWidth="0.8" />
      </g>);

    case 'portraits':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* wood paneling */}
        <rect x="0" y="125" width="240" height="25" fill="#8B6F47" opacity="0.6" />
        {/* Portrait 1: Luther */}
        <rect x="20" y="20" width="60" height="90" fill="#3D2817" stroke={ink} strokeWidth="1.5" />
        <rect x="26" y="26" width="48" height="78" fill="#F8E8D0" />
        <ellipse cx="50" cy="50" rx="14" ry="16" fill="#E8A878" stroke={ink} strokeWidth="0.8" />
        <path d="M 30 100 L 30 75 Q 50 70 70 75 L 70 100 Z" fill="#3D2817" />
        {/* hat (junker) */}
        <path d="M 36 38 Q 50 30 64 38 L 60 32 Q 50 26 40 32 Z" fill="#3D2817" />
        {/* Portrait 2: Käthe */}
        <rect x="90" y="20" width="60" height="90" fill="#3D2817" stroke={ink} strokeWidth="1.5" />
        <rect x="96" y="26" width="48" height="78" fill="#F8E8D0" />
        <ellipse cx="120" cy="52" rx="13" ry="15" fill="#E8A878" stroke={ink} strokeWidth="0.8" />
        <path d="M 100 100 L 100 78 Q 120 72 140 78 L 140 100 Z" fill="#5C7F54" />
        {/* head covering */}
        <path d="M 107 42 Q 120 32 133 42 Q 130 50 120 50 Q 110 50 107 42" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        {/* Portrait 3: parents combined */}
        <rect x="160" y="20" width="60" height="90" fill="#3D2817" stroke={ink} strokeWidth="1.5" />
        <rect x="166" y="26" width="48" height="78" fill="#F8E8D0" />
        <ellipse cx="184" cy="56" rx="9" ry="11" fill="#E8A878" stroke={ink} strokeWidth="0.6" />
        <ellipse cx="200" cy="58" rx="8" ry="10" fill="#E8A878" stroke={ink} strokeWidth="0.6" />
        <path d="M 170 100 L 170 84 Q 190 80 210 84 L 210 100 Z" fill="#3D2817" />
        {/* nameplate */}
        <text x="120" y="118" textAnchor="middle" fontSize="7" fill={ink} fontFamily="serif" fontStyle="italic">Cranach d.Ä.</text>
      </g>);

    case 'bible':
      return wrap(<g>
        <rect x="0" y="0" width="240" height="150" fill="#F8E8D0" />
        {/* lectern */}
        <path d="M 40 130 L 200 130 L 180 145 L 60 145 Z" fill="#8B6F47" stroke={ink} strokeWidth="1" />
        {/* open book */}
        <path d="M 30 120 Q 60 100 120 110 Q 180 100 210 120 L 210 130 Q 180 110 120 120 Q 60 110 30 130 Z" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        <line x1="120" y1="105" x2="120" y2="125" stroke={ink} strokeWidth="0.8" />
        {/* gothic blackletter lines */}
        <g stroke="#3D2817" strokeWidth="0.5" opacity="0.85">
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <line x1={42} y1={42 + i * 9} x2={114} y2={40 + i * 9} />
              <line x1={126} y1={40 + i * 9} x2={198} y2={42 + i * 9} />
            </g>
          ))}
        </g>
        {/* big initial letter */}
        <text x="50" y="55" fontSize="22" fill="#E8A4A4" fontFamily="serif" fontWeight="700">A</text>
        <text x="134" y="55" fontSize="22" fill="#E8A4A4" fontFamily="serif" fontWeight="700">G</text>
        {/* illumination on top */}
        <circle cx="84" cy="35" r="4" fill="#E8A878" />
        <circle cx="156" cy="35" r="4" fill="#7FA177" />
        {/* bookmark ribbon */}
        <path d="M 130 105 L 132 138 L 136 138 L 138 105" fill="#E8A4A4" stroke={ink} strokeWidth="0.6" />
      </g>);

    default:
      return wrap(<rect x="40" y="40" width="160" height="70" fill={fillC} stroke={ink} strokeWidth="1.5" />);
  }
}

/* ─── Pin component ──────────────────────────────────────────── */
/* ─── PoiImage: 실사 사진 우선, 실패 시 SVG 일러스트로 대체 ─── */
function PoiImage({ poi }) {
  const [err, setErr] = useStateM(false);
  if (poi.foto && !err) {
    return (
      <img
        src={poi.foto}
        alt={poi.titel}
        onError={() => setErr(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }
  return <PoiIllustration icon={poi.icon} color={poi.color} />;
}

function MapPin({ poi, active, onClick, translucent }) {
  const colorMap = {
    apricot: 'var(--apricot-deep)',
    sage: 'var(--sage-deep)',
    rose: 'var(--rose)',
    brown: 'var(--brown)',
  };
  const bg = colorMap[poi.color] || 'var(--apricot-deep)';
  const isPark = poi.kind === 'parking';

  return (
    <button
      type="button"
      onPointerDown={onClick}
      onClick={onClick}
      data-active={active}
      className="map-pin"
      style={{
        position: 'absolute',
        left: `${poi.x}%`, top: `${poi.y}%`,
        background: bg,
        width: isPark ? 36 : 32,
        height: isPark ? 36 : 32,
        borderStyle: isPark ? 'dashed' : 'solid',
        opacity: translucent && !active ? 0.78 : 1,
      }}
      title={poi.titel}
    >
      <span className="t-display" style={{ fontWeight: 700, fontSize: isPark ? 16 : 14, color: '#fff', lineHeight: 1 }}>
        {poi.nr}
      </span>
      {poi.highlight && <span className="map-pin-glow" />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Wartburg map — watercolor illustration
   ═══════════════════════════════════════════════════════════════ */
function WartburgMap() {
  const ink = '#3A2008';
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', inset: 0, background: '#F5EDD8' }} />
      <img
        src="assets/wartburg-illustration.png"
        alt="Wartburg Illustration"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center',
          display: 'block', position: 'absolute', inset: 0,
        }}
      />
      <svg viewBox="0 0 600 360" width="100%" height="100%"
        style={{ display: 'block', position: 'absolute', inset: 0, pointerEvents: 'none' }}
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(572, 26)">
          <circle r="15" fill="rgba(255,253,247,0.92)" stroke={ink} strokeWidth="1.2"/>
          <path d="M0,-9 L2.5,0 L0,-2 L-2.5,0Z" fill="#C03618" stroke={ink} strokeWidth="0.7"/>
          <path d="M0,-2 L2.5,0 L0,9 L-2.5,0Z" fill="#EEE8D4" stroke={ink} strokeWidth="0.7"/>
          <text y="-12" textAnchor="middle" fontSize="8" fill={ink} fontFamily="serif" fontWeight="700">N</text>
        </g>
      </svg>
    </React.Fragment>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Wittenberg map — realistic semi-oval old town with Elbe
   ═══════════════════════════════════════════════════════════════ */
function WittenbergMap() {
  const ink = '#6B4423';
  return (
    <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="wt-stripes" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 0 6 L 6 0" stroke={ink} strokeWidth="0.4" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="600" height="360" fill="#F8E8D0" />

      {/* Elbe river — bottom (south of city) */}
      <path d="M 0 320 Q 100 305 200 318 Q 300 332 400 318 Q 500 308 600 318 L 600 360 L 0 360 Z"
            fill="#AED6F1" opacity="0.55" stroke={ink} strokeWidth="1" />
      <path d="M 30 332 Q 130 326 230 336" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.4" />
      <path d="M 280 340 Q 380 332 480 334" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.4" />
      <text x="510" y="335" fontSize="11" fill={ink} fontFamily="serif" fontStyle="italic">~ Elbe ~</text>

      {/* OLD TOWN OUTLINE — semicircle/triangle, fortified ramparts.
          Wittenberg's real shape: long E-W axis along Schlossstraße/Collegienstraße,
          rounded west end (castle), pointed-ish east end, flat south (Elbe). */}
      <path d="M 80 200
               Q 70 110 180 80
               Q 280 60 380 80
               Q 460 90 510 130
               Q 555 170 545 230
               Q 535 280 460 295
               Q 380 305 280 300
               Q 180 295 130 280
               Q 80 260 80 200 Z"
            fill="#FBF2E0" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      {/* dashed inner rampart line */}
      <path d="M 92 200
               Q 84 116 184 90
               Q 280 70 378 90
               Q 456 100 502 136
               Q 545 174 535 226
               Q 526 273 458 287
               Q 380 296 282 290
               Q 184 287 134 272
               Q 92 256 92 200 Z"
            fill="none" stroke={ink} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.5" />

      {/* main streets — Schlossstraße (W) → Collegienstraße (E) along the spine */}
      <path d="M 110 195 Q 200 180 300 185 Q 400 188 500 195"
            stroke={ink} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.18" />
      <path d="M 110 195 Q 200 180 300 185 Q 400 188 500 195"
            stroke={ink} strokeWidth="1" fill="none" strokeDasharray="5 4" opacity="0.4" />

      {/* small cross streets */}
      <path d="M 200 110 Q 210 200 220 290" stroke={ink} strokeWidth="6" fill="none" opacity="0.13" />
      <path d="M 320 110 Q 320 200 320 290" stroke={ink} strokeWidth="6" fill="none" opacity="0.13" />
      <path d="M 430 110 Q 425 200 420 290" stroke={ink} strokeWidth="6" fill="none" opacity="0.13" />

      {/* Stadtmauer accent (south, by Elbe) */}
      <path d="M 130 280 Q 280 295 460 290" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.35" />

      {/* parchment block fill texture */}
      <path d="M 95 200 Q 88 116 184 92 Q 280 72 378 92 Q 456 102 500 138 Q 542 174 532 226 Q 524 270 458 285 Q 380 294 282 288 Q 184 285 134 270 Q 95 254 95 200 Z"
            fill="url(#wt-stripes)" opacity="0.5" />

      {/* Background buildings — small house silhouettes scattered */}
      {[[150, 130], [240, 115], [285, 130], [360, 120], [410, 130], [180, 160], [260, 155], [380, 155], [470, 160],
        [165, 240], [250, 245], [380, 250], [460, 245]].map(([x, y], i) => (
        <g key={i} opacity="0.55">
          <rect x={x - 8} y={y - 6} width="16" height="14" fill="#F4C7A1" stroke={ink} strokeWidth="0.8" />
          <path d={`M ${x - 9} ${y - 6} L ${x} ${y - 13} L ${x + 9} ${y - 6}`} fill="#E8A878" stroke={ink} strokeWidth="0.6" />
          <rect x={x - 2} y={y - 1} width="4" height="6" fill={ink} />
        </g>
      ))}

      {/* PARKING — west, just outside the rampart (Wallstraße) */}
      <g>
        <rect x="22" y="120" width="44" height="36" fill="#D4B896" stroke={ink} strokeWidth="1.2" rx="2" />
        <text x="44" y="146" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="serif" fontWeight="700" stroke={ink} strokeWidth="0.8">P</text>
        <text x="44" y="170" textAnchor="middle" fontSize="7.5" fill={ink} fontFamily="monospace" letterSpacing="0.5">Wallstr.</text>
      </g>

      {/* SCHLOSSKIRCHE complex (POI 1) — west end, Schloss + tall round tower */}
      <g>
        {/* castle south wing */}
        <rect x="80" y="170" width="60" height="50" fill="#F4C7A1" stroke={ink} strokeWidth="1.2" />
        {/* tall round tower with crown — iconic */}
        <rect x="100" y="100" width="22" height="80" fill="#F4C7A1" stroke={ink} strokeWidth="1.5" />
        <rect x="96" y="92" width="30" height="10" fill="#E8A878" stroke={ink} strokeWidth="1" />
        {/* crown spikes */}
        <g stroke={ink} strokeWidth="1" fill="#E8A878">
          <path d="M 100 92 L 103 80 L 106 92" />
          <path d="M 108 92 L 111 78 L 114 92" />
          <path d="M 116 92 L 119 80 L 122 92" />
        </g>
        {/* church nave */}
        <rect x="140" y="160" width="40" height="36" fill="#FBF2E0" stroke={ink} strokeWidth="1.2" />
        <path d="M 138 160 L 160 148 L 182 160" fill="#E8A878" stroke={ink} strokeWidth="1" />
      </g>

      {/* MARKTPLATZ (POI 2) — open square in center with rathaus */}
      <g>
        <rect x="240" y="155" width="120" height="62" fill="#D4B896" opacity="0.4" stroke={ink} strokeWidth="0.8" strokeDasharray="3 2" />
        {/* rathaus — north side of square */}
        <rect x="252" y="125" width="100" height="32" fill="#FBF2E0" stroke={ink} strokeWidth="1.2" />
        <path d="M 248 125 L 268 110 L 288 125" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <path d="M 316 125 L 336 110 L 356 125" fill="#E8A878" stroke={ink} strokeWidth="1" />
        <rect x="294" y="115" width="20" height="10" fill="#E8A878" stroke={ink} strokeWidth="0.8" />
        {/* two small statues on plinths in square */}
        <rect x="266" y="180" width="10" height="6" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        <rect x="269" y="170" width="4" height="10" fill={ink} />
        <circle cx="271" cy="168" r="2" fill={ink} />
        <rect x="324" y="180" width="10" height="6" fill="#FBF2E0" stroke={ink} strokeWidth="0.6" />
        <rect x="327" y="170" width="4" height="10" fill={ink} />
        <circle cx="329" cy="168" r="2" fill={ink} />
      </g>

      {/* CRANACH-HOF (POI 5) — Cranach courts near the Markt */}
      <g>
        <rect x="356" y="145" width="46" height="38" fill="#FBF2E0" stroke={ink} strokeWidth="1.2" />
        <path d="M 352 145 L 379 130 L 406 145" fill="#E8A4A4" opacity="0.65" stroke={ink} strokeWidth="1" />
        <rect x="370" y="166" width="9" height="17" fill="#3D2817" />
        <rect x="386" y="156" width="8" height="9" fill="#FFFBF0" stroke={ink} strokeWidth="0.6" />
        <rect x="360" y="156" width="8" height="9" fill="#FFFBF0" stroke={ink} strokeWidth="0.6" />
        <text x="379" y="198" textAnchor="middle" fontSize="7.5" fill={ink} fontFamily="monospace" letterSpacing="0.4">Cranach-Hof</text>
      </g>

      {/* STADTKIRCHE (POI 3) — twin towers, just south of marketplace */}
      <g>
        <rect x="280" y="225" width="50" height="38" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        <path d="M 278 225 L 305 215 L 332 225" fill="#E8A878" stroke={ink} strokeWidth="1" />
        {/* twin octagonal towers */}
        <rect x="282" y="208" width="14" height="22" fill="#F4C7A1" stroke={ink} strokeWidth="1.2" />
        <rect x="314" y="208" width="14" height="22" fill="#F4C7A1" stroke={ink} strokeWidth="1.2" />
        <path d="M 280 208 Q 289 196 298 208" fill="#7FA177" stroke={ink} strokeWidth="1" />
        <path d="M 312 208 Q 321 196 330 208" fill="#7FA177" stroke={ink} strokeWidth="1" />
        <line x1="289" y1="194" x2="289" y2="200" stroke={ink} strokeWidth="0.8" />
        <line x1="321" y1="194" x2="321" y2="200" stroke={ink} strokeWidth="0.8" />
        <circle cx="305" cy="220" r="3" fill="#E8A4A4" stroke={ink} strokeWidth="0.6" />
      </g>

      {/* LUTHERHAUS (POI 4) — east, large complex with ornate gable */}
      <g>
        <rect x="430" y="160" width="70" height="44" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* renaissance gable shape */}
        <path d="M 426 160 L 432 142 L 446 142 L 450 150 L 460 150 L 464 142 L 478 142 L 484 150 L 494 150 L 498 142 L 504 160 Z"
              fill="#E8A878" stroke={ink} strokeWidth="1" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={438 + i * 12} y={172} width="8" height="10" fill="#FFFBF0" stroke={ink} strokeWidth="0.6" />
        ))}
        <rect x="462" y="190" width="8" height="14" fill="#3D2817" />
      </g>

      {/* LUTHEREICHE (POI 6) — southeast of Lutherhaus */}
      <g>
        <circle cx="515" cy="232" r="16" fill="#7FA177" stroke={ink} strokeWidth="1" />
        <circle cx="505" cy="229" r="10" fill="#A8C3A0" stroke={ink} strokeWidth="0.7" />
        <circle cx="524" cy="226" r="10" fill="#A8C3A0" stroke={ink} strokeWidth="0.7" />
        <rect x="512" y="242" width="6" height="24" fill={ink} />
        <path d="M 499 266 Q 515 255 533 266" fill="none" stroke={ink} strokeWidth="1" opacity="0.5" />
        <text x="515" y="282" textAnchor="middle" fontSize="7.5" fill={ink} fontFamily="monospace" letterSpacing="0.4">Luthereiche</text>
      </g>

      {/* PANORAMA (POI 7) — Arsenalplatz, north of Lutherhaus */}
      <g>
        {/* Arsenal building outline */}
        <rect x="430" y="68" width="52" height="36" fill="#FBF2E0" stroke={ink} strokeWidth="1.2" />
        <path d="M 428 68 L 456 56 L 484 68" fill="#E8A4A4" opacity="0.6" stroke={ink} strokeWidth="1" />
        {/* round panorama cylinder inside */}
        <circle cx="456" cy="86" r="14" fill="#E8A4A4" opacity="0.35" stroke={ink} strokeWidth="1.2" />
        <circle cx="456" cy="86" r="8" fill="#E8A4A4" opacity="0.25" stroke={ink} strokeWidth="0.6" />
        <text x="456" y="90" textAnchor="middle" fontSize="9" fill={ink} fontFamily="monospace" fontWeight="700">360°</text>
        {/* label */}
        <text x="456" y="115" textAnchor="middle" fontSize="7.5" fill={ink} fontFamily="monospace" letterSpacing="0.5" opacity="0.8">Arsenalplatz</text>
        {/* connecting path south to Collegienstr. */}
        <line x1="456" y1="104" x2="456" y2="160" stroke={ink} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.35" />
      </g>

      {/* MELANCHTHONHAUS (POI 8) — Collegienstr. 60, between Markt and Lutherhaus */}
      <g>
        <rect x="388" y="225" width="34" height="30" fill="#FBF2E0" stroke={ink} strokeWidth="1.5" />
        {/* stepped gable */}
        <path d="M 388 225 L 388 215 L 398 215 L 398 209 L 410 209 L 410 215 L 422 215 L 422 225 Z" fill="#F4C7A1" stroke={ink} strokeWidth="1" />
        <rect x="402" y="242" width="6" height="13" fill="#3D2817" />
      </g>

      {/* trees along streets */}
      {[[90, 250], [200, 270], [340, 280], [400, 270], [500, 270]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#7FA177" stroke={ink} strokeWidth="0.5" />
          <rect x={cx - 0.6} y={cy + 3} width="1.2" height="4" fill={ink} />
        </g>
      ))}

      {/* compass */}
      <g transform="translate(550, 50)">
        <circle r="18" fill="#FFFDF7" stroke={ink} strokeWidth="1.2" />
        <path d="M 0 -14 L 3.5 0 L 0 14 L -3.5 0 Z" fill="#E8A878" stroke={ink} strokeWidth="0.8" />
        <text y="-20" textAnchor="middle" fontSize="9" fill={ink} fontFamily="serif" fontWeight="600">N</text>
      </g>

      {/* title cartouche */}
      <g transform="translate(20, 40)">
        <rect width="180" height="44" fill="#FFFDF7" stroke={ink} strokeWidth="1.2" rx="2" transform="rotate(-1.5)" />
        <text x="90" y="20" textAnchor="middle" fontSize="11" fill={ink} fontFamily="monospace" letterSpacing="2">LUTHERSTADT · 1517</text>
        <text x="90" y="38" textAnchor="middle" fontSize="20" fill="#4A2E16" fontFamily="serif" fontStyle="italic" fontWeight="500">Wittenberg</text>
      </g>

      {/* street labels */}
      <text x="180" y="190" fontSize="9" fill={ink} fontFamily="monospace" letterSpacing="1" opacity="0.7" fontStyle="italic">Schlossstr.</text>
      <text x="380" y="183" fontSize="9" fill={ink} fontFamily="monospace" letterSpacing="1" opacity="0.7" fontStyle="italic">Collegienstr.</text>

      {/* scale */}
      <g transform="translate(420, 340)">
        <line x1="0" y1="0" x2="80" y2="0" stroke={ink} strokeWidth="1.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke={ink} strokeWidth="1.5" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke={ink} strokeWidth="1.5" />
        <line x1="80" y1="-3" x2="80" y2="3" stroke={ink} strokeWidth="1.5" />
        <text x="40" y="-8" textAnchor="middle" fontSize="9" fill={ink} fontFamily="monospace">~200 m</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Place Detail Card with expandable Must-See entries
   ═══════════════════════════════════════════════════════════════ */
function MustSeeItem({ item, accent }) {
  const [open, setOpen] = useStateM(false);
  const [imgErr, setImgErr] = useStateM(false);

  return (
    <li style={{
      padding: '10px 12px',
      background: open ? 'rgba(255,253,247,0.85)' : 'transparent',
      border: open ? '1.5px solid rgba(107,68,35,0.18)' : '1.5px solid transparent',
      borderRadius: 10,
      transition: 'background .2s, border-color .2s',
      cursor: 'pointer',
    }}
      onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: accent, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontFamily: 'Fraunces, serif', fontWeight: 700,
          marginTop: 2,
          transition: 'transform .2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          +
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="t-display" style={{ fontSize: 14, fontWeight: 600, color: 'var(--brown-deep)', lineHeight: 1.25 }}>
            {item.titel}
          </div>
          <div className="t-handwriting" style={{ fontSize: 14, color: accent, lineHeight: 1.1, marginTop: 1 }}>
            {item.kurz}
          </div>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 10, paddingLeft: 28, animation: 'fadeIn .25s ease' }}>
          <div style={{
            borderRadius: 8, overflow: 'hidden',
            border: '1px solid rgba(107,68,35,0.2)',
            background: '#FFFDF7',
            marginBottom: 8,
            aspectRatio: '240 / 150',
            position: 'relative',
          }}>
            {item.foto && !imgErr ? (
              <img
                src={item.foto}
                alt={item.titel}
                loading="lazy"
                onError={() => setImgErr(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <PoiIllustration icon={item.bild} color="apricot" />
            )}
          </div>
          <p className="t-body" style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink)', margin: 0 }}>
            <span className="t-typewriter" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--brown)', opacity: 0.7, marginRight: 6 }}>
              ✦ WARUM:
            </span>
            {item.warum}
          </p>
        </div>
      )}
    </li>
  );
}

function AudioBar({ accent, playing, onToggle, lang, onLang, progress, duration, onSeek }) {
  const pct = duration > 0 ? (progress / duration) * 100 : 0;
  const fmt = s => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, '0')}`; };

  return (
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed rgba(107,68,35,0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span className="t-typewriter" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--brown)', opacity: 0.7, flexShrink: 0 }}>
          🎧 AUDIO GUIDE
        </span>
        <button type="button" onClick={onToggle} style={{
          width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
          border: 'none', background: accent, color: '#fff',
          fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(107,68,35,0.2)',
        }}>
          {playing ? '⏸' : '▶'}
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          {['de', 'en'].map(l => (
            <button key={l} type="button" onClick={() => onLang(l)} style={{
              padding: '3px 9px', borderRadius: 999, cursor: 'pointer',
              border: `1.5px solid ${lang === l ? accent : 'rgba(107,68,35,0.3)'}`,
              background: lang === l ? accent : 'transparent',
              color: lang === l ? '#fff' : 'var(--brown)',
              fontFamily: "'Special Elite', monospace",
              fontSize: 10, letterSpacing: '0.1em',
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
        {duration > 0 && (
          <span className="t-typewriter" style={{ fontSize: 9, color: 'var(--brown)', opacity: 0.7, marginLeft: 'auto' }}>
            {fmt(progress)} / {fmt(duration)}
          </span>
        )}
      </div>
      <div onClick={onSeek} style={{
        marginTop: 8, height: 6, borderRadius: 3,
        background: 'rgba(107,68,35,0.15)', cursor: 'pointer', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${pct}%`, borderRadius: 3, background: accent,
          transition: 'width 0.25s linear',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          width: 12, height: 12, borderRadius: '50%', background: accent,
        }} />
      </div>
    </div>
  );
}

function PoiDetail({ poi }) {
  if (!poi) {
    return (
      <div style={{
        padding: '24px 22px',
        background: '#FFFDF7',
        border: '1.5px dashed rgba(107,68,35,0.3)',
        borderRadius: 12,
        textAlign: 'center',
        color: 'var(--brown)',
        opacity: 0.7,
      }}>
        <div className="t-handwriting" style={{ fontSize: 20, color: 'var(--apricot-deep)' }}>
          ✦ Klick auf einen Punkt ✦
        </div>
        <div className="t-typewriter" style={{ fontSize: 11, marginTop: 6, letterSpacing: '0.08em' }}>
          um mehr über den Ort zu erfahren
        </div>
      </div>
    );
  }

  const accent = poi.color === 'sage' ? 'var(--sage-deep)'
              : poi.color === 'rose' ? 'var(--rose)'
              : poi.color === 'brown' ? 'var(--brown)'
              : 'var(--apricot-deep)';

  return (
    <div style={{
      background: '#FFFDF7',
      border: '1.5px solid rgba(107,68,35,0.25)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 14px rgba(107,68,35,0.08)',
    }}>
      <div style={{ position: 'relative', aspectRatio: '240 / 150', borderBottom: '1.5px solid rgba(107,68,35,0.2)' }}>
        <PoiImage key={poi.id} poi={poi} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          minWidth: 30, height: 30, padding: '0 8px',
          borderRadius: 999,
          background: accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 15,
          boxShadow: '0 2px 5px rgba(107,68,35,0.25)',
        }}>
          {poi.kind === 'parking' ? 'P · Parken' : `Station ${poi.nr}`}
        </div>
        {poi.highlight && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'var(--brown-deep)', color: 'var(--cream)',
            padding: '3px 10px', borderRadius: 999,
            fontFamily: 'Caveat, cursive', fontSize: 14,
            transform: 'rotate(3deg)',
          }}>
            ✦ Pflicht!
          </div>
        )}
      </div>

      <div style={{ padding: '14px 18px 18px' }}>
        <h4 className="t-display" style={{ fontSize: 19, margin: '0 0 2px', color: 'var(--brown-deep)', fontWeight: 500, lineHeight: 1.15 }}>
          {poi.titel}
        </h4>
        <div className="t-handwriting" style={{ fontSize: 16, color: accent, lineHeight: 1, marginBottom: 10 }}>
          {poi.untertitel}
        </div>
        <p className="t-body" style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)', margin: '0 0 8px' }}>
          {poi.text}
        </p>
        {poi.audio && poi.audioProps && (
          <AudioBar accent={accent} {...poi.audioProps} />
        )}
        {poi.must && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed rgba(107,68,35,0.25)' }}>
            <div className="t-typewriter" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--brown)', opacity: 0.7, marginBottom: 6 }}>
              ✦ NICHT VERPASSEN — KLICK FÜR DETAILS
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {poi.must.map((m, i) => (
                <MustSeeItem key={i} item={m} accent={accent} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MapSection — wraps map + list + detail for one location ── */
function MapSection({ ort, untertitel, pois, MapComp, color = 'apricot' }) {
  const firstStation = pois.find(p => p.kind !== 'parking') || pois[0];
  const [activeId, setActiveId] = useStateM(firstStation.id);

  /* ── Persistent audio state ─────────────────────────────────── */
  const [audioLang, setAudioLang] = useStateM('de');
  const [audioPlaying, setAudioPlaying] = useStateM(false);
  const [audioProgress, setAudioProgress] = useStateM(0);
  const [audioDuration, setAudioDuration] = useStateM(0);
  const [audioError, setAudioError] = useStateM('');
  const audioRef = React.useRef(null);
  const loadedSrcRef = React.useRef(null);

  const active = pois.find(p => p.id === activeId);
  const selectPoi = (id) => setActiveId(id);

  // Switch audio source when POI or lang changes, preserve playback state
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!active?.audio) {
      el.pause();
      el.removeAttribute('src');
      el.load();
      loadedSrcRef.current = null;
      setAudioPlaying(false);
      setAudioProgress(0);
      setAudioDuration(0);
      setAudioError('');
      return;
    }
    const newSrc = active.audio[audioLang];
    if (loadedSrcRef.current === newSrc) return;
    const wasPlaying = !el.paused;
    loadedSrcRef.current = newSrc;
    el.src = newSrc;
    el.load();
    setAudioError('');
    setAudioDuration(0);
    if (wasPlaying) {
      el.play().catch(() => {
        setAudioPlaying(false);
        setAudioError('Audio konnte nicht gestartet werden.');
      });
    } else {
      setAudioProgress(0);
    }
  }, [active && active.id, audioLang]);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el || !active?.audio) return;
    const src = active.audio[audioLang];
    if (loadedSrcRef.current !== src) {
      loadedSrcRef.current = src;
      el.src = src;
      el.load();
      setAudioError('');
    }
    if (audioPlaying) { el.pause(); setAudioPlaying(false); }
    else {
      el.play()
        .then(() => setAudioError(''))
        .catch(() => {
          setAudioPlaying(false);
          setAudioError('Audio konnte nicht gestartet werden.');
        });
    }
  };

  const switchLang = (l) => {
    setAudioLang(l);
  };

  const handleSeek = (e) => {
    const el = audioRef.current;
    if (!el || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const t = ratio * audioDuration;
    el.currentTime = t;
    setAudioProgress(t);
  };

  // Attach audio element event handlers once
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setAudioProgress(el.currentTime);
    const onMeta = () => setAudioDuration(el.duration);
    const onError = () => {
      setAudioPlaying(false);
      setAudioError('Audio konnte nicht geladen werden.');
    };
    const onPlay = () => setAudioPlaying(true);
    const onPause = () => setAudioPlaying(false);
    const onEnd = () => { setAudioPlaying(false); setAudioProgress(0); };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('error', onError);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnd);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('error', onError);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnd);
    };
  }, []);

  const audioProps = active?.audio ? {
    playing: audioPlaying, onToggle: toggleAudio,
    lang: audioLang, onLang: switchLang,
    progress: audioProgress, duration: audioDuration, onSeek: handleSeek,
  } : null;

  // Inject audioProps into active poi for PoiDetail
  const activeWithAudio = active ? { ...active, audioProps } : null;

  return (
    <div style={{ marginTop: 28 }}>
      {/* Persistent hidden audio element — never unmounts, keeps playback alive across POI switches */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <span className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--brown)', opacity: 0.65 }}>
          STADTPLAN ·
        </span>
        <h3 className="t-display" style={{ margin: 0, fontSize: 26, color: 'var(--brown-deep)', fontWeight: 500, fontStyle: 'italic' }}>
          {ort}
        </h3>
        <span className="t-handwriting" style={{ fontSize: 18, color: color === 'sage' ? 'var(--sage-deep)' : 'var(--apricot-deep)' }}>
          {untertitel}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.6fr) minmax(260px, 1fr)',
        gap: 18,
      }} className="map-grid">
        <div style={{
          position: 'relative',
          aspectRatio: '600 / 360',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1.5px solid rgba(107,68,35,0.25)',
          boxShadow: '0 6px 20px rgba(107,68,35,0.1)',
        }}>
          <MapComp activeId={activeId} />
          {pois.filter(p => p.kind !== 'parking').map(p => (
            <MapPin key={p.id} poi={p} active={activeId === p.id} onClick={() => selectPoi(p.id)} />
          ))}
        </div>

        <div>
          <PoiDetail poi={activeWithAudio} />
        </div>
      </div>

      {/* Quick chips below map */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
        {pois.map(p => {
          const isActive = p.id === activeId;
          const accent = p.color === 'sage' ? 'var(--sage-deep)'
                       : p.color === 'rose' ? 'var(--rose)'
                       : p.color === 'brown' ? 'var(--brown)'
                       : 'var(--apricot-deep)';
          return (
            <button key={p.id} type="button" onPointerDown={() => selectPoi(p.id)} onClick={() => selectPoi(p.id)}
              className="poi-chip" data-active={isActive}
              style={{
                borderColor: isActive ? accent : 'rgba(107,68,35,0.25)',
                background: isActive ? accent : '#FFFDF7',
                color: isActive ? '#fff' : 'var(--brown-deep)',
              }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999,
                background: isActive ? '#fff' : accent,
                color: isActive ? accent : '#fff',
                fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 11, marginRight: 6,
              }}>{p.nr}</span>
              <span className="t-display" style={{ fontWeight: 500, fontSize: 13 }}>{p.titel.replace(' ✦', '')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WEIMARER CRANACH-ALTAR — Bilddetail (Herderkirche, Mitteltafel)
   Lucas Cranach d.Ä. & d.J., 1552–1555 · Stadtkirche St. Peter und Paul
   Positionen als % der Mitteltafel (Hochformat 1000 × 1207)
   ═══════════════════════════════════════════════════════════════ */
const CRANACH_IMG = WM + 'Herderkirche Weimar Cranach Altarpiece.jpg?width=1000';

const CRANACH_POIS = [
  {
    id: 'kreuz', nr: 1, x: 47, y: 11, color: 'brown',
    titel: 'Der gekreuzigte Christus',
    untertitel: 'Mitte · Herz des Bildes',
    text: 'Im Zentrum hängt der gekreuzigte Christus — optischer und theologischer Mittelpunkt der ganzen Tafel. Alles ringsum, Gesetz wie Evangelium, Tod wie Auferstehung, ordnet sich auf dieses eine Geschehen am Kreuz hin.',
  },
  {
    id: 'blut', nr: 2, x: 60, y: 20, color: 'rose', highlight: true,
    titel: 'Der Blutstrahl auf Cranachs Haupt',
    untertitel: 'Bogen von der Seitenwunde nach rechts',
    text: 'Aus der Seitenwunde Jesu spritzt ein Blutstrahl in hohem Bogen quer über das Bild — und trifft genau den Kopf von Lucas Cranach dem Älteren. Eine der kühnsten Bildideen der Reformation: Das Blut Christi rettet ganz persönlich, hier und jetzt, diesen einen Menschen.',
  },
  {
    id: 'cranach', nr: 3, x: 83, y: 45, color: 'apricot', highlight: true,
    titel: 'Lucas Cranach der Ältere',
    untertitel: 'Der Maler als erlöster Sünder',
    text: 'Der greise Maler mit weißem Bart steht mitten im Bild — als Empfänger der Gnade, auf dessen Haupt das Blut fällt. Cranach d.Ä. starb 1553; sein Sohn Lucas Cranach d.J. vollendete den Altar 1555. So wurde das Werk zugleich zum Vermächtnis und Glaubensbekenntnis des Vaters.',
  },
  {
    id: 'luther', nr: 4, x: 93, y: 52, color: 'sage',
    titel: 'Martin Luther & die Bibel',
    untertitel: 'Ganz rechts · Finger auf dem Wort',
    text: 'Luther hält dem Betrachter die aufgeschlagene Bibel entgegen, der Finger weist auf den Text. Zitiert werden Hebräer 4,16, 1. Johannes 1,7 und Johannes 3,14–15 — „sola scriptura": Allein das Wort Gottes deutet, was am Kreuz geschieht.',
  },
  {
    id: 'taeufer', nr: 5, x: 72, y: 49, color: 'apricot',
    titel: 'Johannes der Täufer',
    untertitel: 'Im Fellgewand · weist auf Christus',
    text: 'Zwischen Kreuz und Reformatoren steht Johannes der Täufer im Kamelhaargewand. Die eine Hand weist hinauf zum Gekreuzigten, die andere hinab zum Lamm — „Siehe, das ist Gottes Lamm, das der Welt Sünde trägt" (Joh 1,29).',
  },
  {
    id: 'lamm', nr: 6, x: 57, y: 85, color: 'rose', highlight: true,
    titel: 'Das Lamm Gottes',
    untertitel: 'Unter dem Kreuz · mit Siegesfahne',
    text: 'Am Fuß des Kreuzes steht das weiße Lamm mit der Kreuzfahne — das „Agnus Dei". Es trägt die Inschrift vom Lamm, das der Welt Sünde trägt, und verbindet das Opfer Christi mit dem Passahlamm des Alten Bundes.',
  },
  {
    id: 'auferstanden', nr: 7, x: 17, y: 52, color: 'sage',
    titel: 'Der auferstandene Christus',
    untertitel: 'Links vorn · Sieg über Tod & Teufel',
    text: 'Derselbe Christus erscheint links noch einmal — auferstanden, im roten Mantel, mit der Kreuzfahne. Er zertritt Tod (Skelett) und Teufel (Drache) unter seinen Füßen: „Christus Victor", der Triumph über Hölle und Verdammnis.',
  },
  {
    id: 'adam', nr: 8, x: 39, y: 55, color: 'brown',
    titel: 'Der fliehende Mensch (Adam)',
    untertitel: 'Hinter dem Kreuz · ins Feuer getrieben',
    text: 'Ein nackter Mensch flieht entsetzt vor Tod und Teufel, die ihn in die Flammen treiben. Er steht für den Menschen unter dem Gesetz, der ohne die Gnade Christi zu Recht dem Verderben verfällt — die dunkle Kehrseite zur Auferstehung links.',
  },
  {
    id: 'moses', nr: 9, x: 56, y: 49, color: 'apricot',
    titel: 'Moses & die Propheten',
    untertitel: 'Kleine Gruppe · die Gesetzestafeln',
    text: 'Klein im Mittelgrund steht Moses mit einer Schar Propheten und verweist auf das geöffnete Buch der Gebote Gottes. Das Gesetz deckt die Sünde auf — und macht so die Gnade des Kreuzes erst nötig.',
  },
  {
    id: 'schlange', nr: 10, x: 74, y: 34, color: 'sage',
    titel: 'Die eherne Schlange',
    untertitel: 'Hintergrund · Schlange am Pfahl',
    text: 'Im Hintergrund richtet Moses die eherne Schlange am Pfahl auf (4. Mose 21). Wer sie ansah, wurde geheilt — für Luther ein Vorbild des Kreuzes: „Wie Mose die Schlange erhöhte, so muss der Menschensohn erhöht werden" (Joh 3,14).',
  },
  {
    id: 'lager', nr: 11, x: 85, y: 25, color: 'brown',
    titel: 'Das Lager Israels',
    untertitel: 'Rechts hinten · Zelte in der Wüste',
    text: 'Die Zelte des wandernden Gottesvolkes in der Wüste bilden den Schauplatz der ehernen Schlange. Die Tiefenstaffelung verknüpft Alten und Neuen Bund in einer einzigen Landschaft statt der sonst üblichen Links-rechts-Teilung.',
  },
  {
    id: 'hirten', nr: 12, x: 73, y: 19, color: 'rose',
    titel: 'Verkündigung an die Hirten',
    untertitel: 'Oben rechts · Engel & Herde',
    text: 'Am Himmel erscheint ein Engel den Hirten auf dem Feld und verkündet die Geburt des Erlösers (Lk 2). Die frohe Botschaft der Gnade rahmt das Geschehen — vom Stall bis zum Kreuz reicht der eine Heilsweg.',
  },
];

function CranachLegendItem({ poi, active, accent, onActivate, itemRef }) {
  return (
    <li
      ref={itemRef}
      onClick={onActivate}
      style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        padding: '11px 13px',
        borderRadius: 10,
        cursor: 'pointer',
        background: active ? 'rgba(255,253,247,0.95)' : 'transparent',
        border: active ? `1.5px solid ${accent}` : '1.5px solid transparent',
        boxShadow: active ? '0 3px 10px rgba(107,68,35,0.1)' : 'none',
        transition: 'background .2s, border-color .2s, box-shadow .2s',
      }}>
      <span style={{
        flexShrink: 0,
        width: 26, height: 26, borderRadius: '50%',
        background: accent, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 14,
        marginTop: 1,
      }}>{poi.nr}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="t-display" style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--brown-deep)', lineHeight: 1.2 }}>
          {poi.titel}
        </div>
        <div className="t-handwriting" style={{ fontSize: 15, color: accent, lineHeight: 1.05, marginTop: 1 }}>
          {poi.untertitel}
        </div>
        {active && (
          <p className="t-body" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink)', margin: '7px 0 0', animation: 'fadeIn .25s ease' }}>
            {poi.text}
          </p>
        )}
      </div>
    </li>
  );
}

function CranachAltarSection() {
  const accentFor = (c) => c === 'sage' ? 'var(--sage-deep)'
                         : c === 'rose' ? 'var(--rose)'
                         : c === 'brown' ? 'var(--brown)'
                         : 'var(--apricot-deep)';
  const [activeId, setActiveId] = useStateM(CRANACH_POIS[0].id);
  const itemRefs = React.useRef({});

  const select = (id) => {
    setActiveId(id);
    const el = itemRefs.current[id];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
        <span className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--brown)', opacity: 0.65 }}>
          BILDDETAIL ·
        </span>
        <h3 className="t-display" style={{ margin: 0, fontSize: 26, color: 'var(--brown-deep)', fontWeight: 500, fontStyle: 'italic' }}>
          Weimarer Cranach-Altar
        </h3>
        <span className="t-handwriting" style={{ fontSize: 18, color: 'var(--sage-deep)' }}>
          Herderkirche · Mitteltafel
        </span>
      </div>
      <p className="t-body" style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink)', margin: '0 0 16px', maxWidth: 640 }}>
        Das reformatorische Hauptwerk von Lucas Cranach d.Ä. und d.J. (1552–1555). In einer einzigen Landschaft verschmelzen Gesetz und Gnade, Tod und Auferstehung. Tippe auf eine Zahl im Bild oder in der Liste.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 0.82fr) minmax(0, 1fr)',
        gap: 18,
        alignItems: 'start',
      }} className="map-grid">
        <div style={{
          position: 'relative',
          aspectRatio: '1000 / 1207',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1.5px solid rgba(107,68,35,0.25)',
          boxShadow: '0 6px 20px rgba(107,68,35,0.1)',
          background: '#F5EDD8',
        }}>
          <img
            src={CRANACH_IMG}
            alt="Weimarer Cranach-Altar — Mitteltafel"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {CRANACH_POIS.map(p => (
            <MapPin key={p.id} poi={p} active={activeId === p.id} onClick={() => select(p.id)} translucent />
          ))}
        </div>

        <ul style={{
          margin: 0, padding: 0, listStyle: 'none',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {CRANACH_POIS.map(p => (
            <CranachLegendItem
              key={p.id}
              poi={p}
              active={activeId === p.id}
              accent={accentFor(p.color)}
              onActivate={() => select(p.id)}
              itemRef={(el) => { itemRefs.current[p.id] = el; }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Public exports ─────────────────────────────────────────── */
function WartburgSection() {
  return <MapSection
    ort="Wartburg"
    untertitel="Parkplatz + 6 Stationen auf der Burg"
    pois={WARTBURG_POIS}
    MapComp={WartburgMap}
    color="apricot"
  />;
}

function WittenbergSection() {
  return <MapSection
    ort="Wittenberg"
    untertitel="Parkplatz + 6 Stationen in der Lutherstadt"
    pois={WITTENBERG_POIS}
    MapComp={WittenbergMap}
    color="sage"
  />;
}

Object.assign(window, { WartburgSection, WittenbergSection, CranachAltarSection });
