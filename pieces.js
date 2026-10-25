/* مداد · Midad · the content of the site.
   This is the only file to edit when adding a piece.
   Order here is the order on the site; new pieces go wherever you want them to appear. */

/* ---------- the pieces ----------
   kind: 'verse' | 'saying' | 'own'
   lines: verse goes in as pairs [first hemistich, second hemistich];
          prose goes in as one string per paragraph.
   author / source: shown under the text; leave source empty to hide it. */
window.PIECES = [
  {
    kind: 'verse',
    ar: {
      lines: [
        ['على قدرِ أهلِ العزمِ تأتي العزائمُ', 'وتأتي على قدرِ الكرامِ المكارمُ'],
        ['وتعظُمُ في عينِ الصغيرِ صغارُها', 'وتصغُرُ في عينِ العظيمِ العظائمُ']
      ],
      author: 'المتنبي', source: 'الديوان'
    },
    en: {
      lines: [
        ['Resolve arrives in the measure of the resolute,', 'and noble deeds in the measure of the noble.'],
        ["Small things loom large in a small man's eye,", 'and great things shrink in the eye of the great.']
      ],
      author: 'Al-Mutanabbi', source: 'The Diwan'
    }
  },
  {
    kind: 'saying',
    ar: { lines: ['قيمةُ كلِّ امرئٍ ما يُحسِنُه.'], author: 'علي بن أبي طالب', source: 'نهج البلاغة' },
    en: { lines: ["A man's worth is what he does well."], author: 'Ali ibn Abi Talib', source: 'Nahj al-Balagha' }
  },
  {
    kind: 'verse',
    ar: {
      lines: [
        ['أراكَ عصيَّ الدمعِ شيمتُكَ الصبرُ', 'أما للهوى نهيٌ عليكَ ولا أمرُ'],
        ['بلى أنا مشتاقٌ وعنديَ لوعةٌ', 'ولكنَّ مثلي لا يُذاعُ له سرُّ']
      ],
      author: 'أبو فراس الحمداني', source: 'الديوان'
    },
    en: {
      lines: [
        ['I see your tears withheld; patience is your way.', 'Has love no rule over you, no command and no forbidding?'],
        ['Yes, I long, and a burning is in me,', 'but one like me does not let a secret out.']
      ],
      author: 'Abu Firas al-Hamdani', source: 'The Diwan'
    }
  },
  {
    /* PLACEHOLDER: replace with your own writing */
    kind: 'own',
    ar: { lines: ['الحبرُ لا يجفُّ ما دامَ في القلبِ ما لم يُقَلْ.'], author: 'من دفتري', source: '' },
    en: { lines: ['Ink does not dry while the heart still holds what was never said.'], author: 'From my notebook', source: '' }
  },
  {
    kind: 'verse',
    ar: {
      lines: [
        ['قِفا نَبكِ من ذِكرى حبيبٍ ومنزلِ', 'بِسِقطِ اللِّوى بينَ الدَّخولِ فحَومَلِ'],
        ['فتوضِحَ فالمِقراةِ لم يَعفُ رسمُها', 'لِما نَسَجَتها من جَنوبٍ وشَمألِ']
      ],
      author: 'امرؤ القيس', source: 'المعلّقة'
    },
    en: {
      lines: [
        ['Halt, you two, and let us weep for the memory of a beloved and an abode', 'where the sand bends, between al-Dakhul and Hawmal,'],
        ['and Tudih and al-Miqrat: the traces are not effaced', 'for all that the south wind and the north have woven over them.']
      ],
      author: "Imru' al-Qais", source: "The Mu'allaqa"
    }
  },
  {
    kind: 'verse',
    ar: {
      lines: [['وإنّي وإن كنتُ الأخيرَ زمانُهُ', 'لآتٍ بما لم تستطعْهُ الأوائلُ']],
      author: 'أبو العلاء المعرّي', source: 'سقط الزند'
    },
    en: {
      lines: [['Though my age has placed me last,', 'I bring what those before me could not.']],
      author: "Abu al-'Ala' al-Ma'arri", source: 'Saqt al-Zand'
    }
  },
  {
    /* PLACEHOLDER: replace with your own writing */
    kind: 'own',
    ar: { lines: ['كلُّ قصيدةٍ رسالةٌ إلى غائبٍ لا يقرأ.'], author: 'من دفتري', source: '' },
    en: { lines: ['Every poem is a letter to someone absent, who does not read.'], author: 'From my notebook', source: '' }
  }
];
