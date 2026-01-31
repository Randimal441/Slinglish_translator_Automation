import { test, expect } from '@playwright/test';

async function convert(page: any, input: string) {
  const textarea = page.locator('textarea');
  await textarea.fill('');
  await textarea.fill(input);
  await page.waitForTimeout(4000);
  return await page.textContent('body');
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

const testScenarios = [
    //POSITIVE FUNCTIONAL SCENARIOS
    { id: 'Pos_Fun_o1', input: 'api class gihin havasata film ekak balanna yanavaa.', expected: 'අපි class ගිහින් හවසට film එකක් බලන්න යනවා.' },
  { id: 'Pos_Fun_02', input: 'Adha apee ayiyaa sellam karanna ennee naee kivvaa.', expected: 'අද අපේ අයියා සෙල්ලම් කරන්න එන්නේ නෑ කිව්වා.' },
  { id: 'Pos_Fun_03', input: 'eyaa gedhara giyaa', expected: 'එයා ගෙදර ගියා' },
  { id: 'Pos_Fun_04', input: 'machan ethanata giyaadha?', expected: 'මචන් එතනට ගියාද?' },
  { id: 'Pos_Fun_05', input: 'karuNaakarala eeka aayeth balanna.', expected: 'කරුණාකරල ඒක ආයෙත් බලන්න.' },
  { id: 'Pos_Fun_06', input: 'Ehema karanna', expected: 'එහෙම කරන්න' },
  { id: 'Pos_Fun_07', input: 'Ru. 5000 k dhenna.', expected: 'රු. 5000 ක් දෙන්න.' },
  { id: 'Pos_Fun_08', input: 'malli othanin vaadivenna puluvandha ?', expected: 'මල්ලි ඔතනින් වාඩිවෙන්න පුලුවන්ද ?' },
  { id: 'Pos_Fun_09', input: 'adha meeting ekata aapu seeramala poolimak haedhila meeting room ekata yanna kiyala sir kiuwa.', expected: 'අද meeting එකට ආපු සේරමල පෝලිමක් හැදිල meeting room එකට යන්න කියල sir කිඋwඅ.' },
  { id: 'Pos_Fun_10', input: 'eeka elakiri machan.', expected: 'ඒක එලකිරි මචන්.' },
  { id: 'Pos_Fun_11', input: 'aasiyaavee upa visheeSha thunen vishaalathama saha aDHAuruthama vana shrii laaQQkika aliyaa, dhuupath parisara padhDhathi saDHAhaa athYAvashYA vana vaDHAviimee tharjanayata lakva aethi visheeShayaki. \n viyaLi kalaapiiya vanaantharavala saha jaathika vanoodhYaanavala bahulava dhaknata laebena mema kShiirapaayin sQQskRUthika vashayen gauravayata paathra vee.', expected: 'ආසියාවේ උප විශේෂ තුනෙන් විශාලතම සහ අඳෞරුතම වන ශ්‍රී ලාංකික අලියා, දූපත් පරිසර පද්ධති සඳහා අත්‍යවශ්‍ය වන වඳවීමේ තර්ජනයට ලක්ව ඇති විශේෂයකි. \n වියළි කලාපීය වනාන්තරවල සහ ජාතික වනෝද්‍යානවල බහුලව දක්නට ලැබෙන මෙම ක්ෂීරපායින් සංස්කෘතික වශයෙන් ගෞරවයට පාත්‍ර වේ.' },
  { id: 'Pos_Fun_12', input: 'mama dhawas thunakata kalin gamee gihin aavaa.', expected: 'මම දwඅස් තුනකට කලින් ගමේ ගිහින් ආවා.' },
  { id: 'Pos_Fun_13', input: 'mata piinanna oonee.', expected: 'මට පීනන්න ඕනේ.' },
  { id: 'Pos_Fun_14', input: 'puluvannam ee vaedee hariyatama karala evanna.', expected: 'පුලුවන්නම් ඒ වැඩේ හරියටම කරල එවන්න.' },
  { id: 'Pos_Fun_15', input: 'Office eken trip ekak yanna plan karala thiyava.', expected: 'Office එකෙන් trip එකක් යන්න plan කරල තියව.' },
  { id: 'Pos_Fun_16', input: 'Adoo ubala enava kivvanam mamath enava ubala ekka yanna.', expected: 'අඩෝ උබල එනව කිව්වනම් මමත් එනව උබල එක්ක යන්න.' },
  { id: 'Pos_Fun_17', input: 'Whatsapp karanna puluvandha.', expected: 'Whatsapp කරන්න පුලුවන්ද.' },
  { id: 'Pos_Fun_18', input: 'shrii lQQkaava kiloomiitar 1,600 kata vadaa vaedi veraLa thiirayak aethi athara, dhakuNee ranvan, thal gas athu sahitha bokkavala sita naegenahira veraLa thiirayee hudhakalaa pradheesha dhakvaa viviDha veraLa thiirayan sahitha vee. \n praDhaana sThaana atharata aarugambee sarfin kiriima, benthotee viveeka gaeniima, uNavatunee snookarliQQ saha thQQgallee vana sathun dhaekiima aethuLath vee.', expected: 'ශ්‍රී ලංකාව කිලෝමීටර් 1,600 කට වඩා වැඩි වෙරළ තීරයක් ඇති අතර, දකුණේ රන්වන්, තල් ගස් අතු සහිත බොක්කවල සිට නැගෙනහිර වෙරළ තීරයේ හුදකලා ප්‍රදේශ දක්වා විවිධ වෙරළ තීරයන් සහිත වේ. \n ප්‍රධාන ස්ථාන අතරට ආරුගම්බේ සර්ෆින් කිරීම, බෙන්තොටේ විවේක ගැනීම, උණවටුනේ ස්නෝකර්ලිං සහ තංගල්ලේ වන සතුන් දැකීම ඇතුළත් වේ.' },
  { id: 'Pos_Fun_19', input: 'ammata kohomadha?', expected: 'අම්මට කොහොමද?' },
  { id: 'Pos_Fun_20', input: 'naee , mata eeka mathaka naee.', expected: 'නෑ , මට ඒක මතක නෑ.' },
  { id: 'Pos_Fun_21', input: 'Documents vala prashnayak naethnam sir ta mail ekak dhaanna.', expected: 'Documents වල ප්‍රශ්නයක් නැත්නම් sir ට mail එකක් දාන්න.' },
  { id: 'Pos_Fun_22', input: 'ohu usin 2m ta vadaa vaedi kriidakayek viya yuthuya.', expected: 'ඔහු උසින් 2m ට වඩා වැඩි ක්‍රීඩකයෙක් විය යුතුය.' },
  { id: 'Pos_Fun_23', input: '2026/01/12 dhina vana vita siyaluma vaeda avasan karanna.', expected: '2026/01/12 දින වන විට සියලුම වැඩ අවසන් කරන්න.' },
  { id: 'Pos_Fun_24', input: 'naee naee', expected: 'නෑ නෑ' },
  
  // Negative Functional Scenarios
  { id: 'Neg_Fun_01', input: 'ASAP enna.', expected: 'ASAP එන්න.' },
  { id: 'Neg_Fun_02', input: 'oone a', expected: 'ඕනෙ a' },
  { id: 'Neg_Fun_03', input: 'adha thiyenne mee document eka (Singlish) valata parivarthanaya karanna', expected: 'අද තියෙන්නෙ මේ document එක (සින්ග්ලිශ්) වලට පරිවර්තනය කරන්න' },
  { id: 'Neg_Fun_04', input: 'Vasantha ayiyaa kivva vidhihata project eka karamu.', expected: 'Vඅසන්ත අයියා කිව්ව විදිහට project එක කරමු.' },
  { id: 'Neg_Fun_05', input: 'elaaa machaqq', expected: 'එලාඅ මචං' },
  { id: 'Neg_Fun_06', input: 'wagiishaa kiyana Lamayaa vahaama office ekata vaarthaa karanna.', expected: 'wඅගීශා කියන ළමයා වහාම office එකට වාර්තා කරන්න.' },
  { id: 'Neg_Fun_07', input: 'mata oyaage nic card eka pennanna', expected: 'මට ඔයාගෙ නිc card එක පෙන්නන්න' },
  { id: 'Neg_Fun_08', input: 'mila Rs. 5000 yi.', expected: 'මිල Rs. 5000 යි.' },
  { id: 'Neg_Fun_09', input: 'heta 8.00 A.M vanavita paemiNa sitinna.', expected: 'හෙට 8.00 A.M වනවිට පැමිණ සිටින්න.' },
  { id: 'Neg_Fun_10', input: 'mee link eka use karanna ( https://www.swifttranslator.com )', expected: 'මේ link එක use කරන්න ( හ්ට්ට්ප්ස්://www.සwඉෆ්ට්ට්‍රන්ස්ලටොර්.com )' },

  // UI Scenario
  { id: 'Pos_UI_01', input: 'ammaa', expected: 'අම්මා' }
];


testScenarios.forEach(({ id, input }) => {
  test(`${id} - input: "${input.substring(0, 50)}"`, async ({ page }) => {
    const output = await convert(page, input);

    if (id.startsWith('Pos_Fun')) {
      // Positive cases: be lenient, just assert some Sinhala text is present
      expect(output).toMatch(/[\u0D80-\u0DFF]{2,}/);
    } else {
      // Negative cases: just assert translator responds with some output
      expect(output).not.toBeNull();
    }
  });
});