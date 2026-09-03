// JavaScript Application Logic for Sesshu BtoB BPO Service (SmartHR Format LP)

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Pricing Segment Tab Switching Logic (法人 / 一人会社 / 個人) ---
  const tabData = {
    corporate: {
      title: "🏢 エンタープライズBPOプラン（法人向け）",
      persona: "【対象】年商数億円〜数十億円・卸売業者・製造業・受発注/物流/営業などのチーム運用",
      desc: "既存基幹システムデータ（PCA、勘定奉行、アラジンオフィス等）を当社専任チームが完全移植。現地/Webでの業務フロー設計と、初月BPOチーム常駐・受注入力完全丸投げ代行で現場の負荷をゼロ化します。",
      initial: '通常 ¥200,000 ➔ <strong style="color: #d97706;">年間契約特典 ¥30,000</strong>',
      price: "¥78,000〜",
      meter: "月間注文データ 3,000件〜 (超過分: 1件 30円)",
      features: [
        "既存基幹システム（PCA/勘定奉行/アラジン等）データ完全移植代行",
        "現地 / Webヒアリングおよび受発注オペレーションフロー構築",
        "初月専任BPOチーム常駐・受注入力完全丸投げ代行",
        "100%人間ダブルチェック ＆ SLA（サービス品質保証）標準付帯",
        "専用API・カスタム基幹システム双方向連携"
      ],
      planKey: "corporate",
      planName: "エンタープライズBPOプラン",
      btnText: "法人向けプランで資料請求"
    },
    solo: {
      title: "🏪 マイクロBPOプラン（一人会社向け ★一番人気）",
      persona: "【対象】社長1名＋パート等で運営する小規模卸・販売代理店・受注作業のワンマン化解消",
      desc: "一人社長の最大のボトルネックである「夜間・早朝の手書きFAX入力作業」を丸投げ代行。マスタ代行登録、癖字・FAX略称のAI辞書設定、インボイス・会計ソフト連携まで初月専任伴走します。",
      initial: '通常 ¥80,000 ➔ <strong style="color: #d97706;">年間契約特典 ¥10,000</strong>',
      price: "¥29,800",
      meter: "月間注文データ 1,000件まで (超過分: 1件 35円)",
      features: [
        "商品・取引先マスタデータ完全移行代行 (500件まで)",
        "貴社固有の癖字・FAX略称・自社品番AI辞書チューニング",
        "初月ハイブリッド型運用伴走 (AI自動補正 ＋ オペレーター確認)",
        "LINE / Web簡易発注モジュール標準提供",
        "インボイス対応・法人会計ソフト（弥生・マネーフォワード等）連携"
      ],
      planKey: "solo",
      planName: "マイクロBPOプラン",
      btnText: "一人会社向けプランで資料請求"
    },
    individual: {
      title: "💼 パーソナル伴走プラン（個人向け）",
      persona: "【対象】個人事業主・個人農家・仲卸・フリーランス・小規模店舗",
      desc: "初期費用完全無料（年間契約特典：通常¥30,000➔¥0）。月額1万円未満に固定費を抑えつつ、マスタ登録100件代行と初月専任チャット伴走で手作業ゼロの自動受発注環境を構築します。",
      initial: '通常 ¥30,000 ➔ <strong style="color: #d97706;">年間契約特典 ¥0 (完全無料)</strong>',
      price: "¥9,800",
      meter: "月間注文データ 300件まで (超過分: 1件 40円)",
      features: [
        "商品/取引先マスタデータ登録代行 (100件まで)",
        "初月専任チャット伴走サポート (設定・操作の完全指導)",
        "汎用AI-OCR手書き・癖字認識エンジン",
        "標準CSV/Excelデータ自動出力・自動整理",
        "初期費用0円で手軽にスタート可能"
      ],
      planKey: "individual",
      planName: "パーソナル伴走プラン",
      btnText: "個人向けプランで資料請求"
    }
  };

  const pricingTabBtns = document.querySelectorAll(".pricing-tab-btn");
  const pricingTabContent = document.getElementById("pricingTabContent");

  function renderTabContent(tabKey) {
    const data = tabData[tabKey];
    if (!data || !pricingTabContent) return;

    pricingTabContent.innerHTML = `
      <div class="tab-detail-grid">
        <div>
          <div style="font-size: 0.9rem; color: var(--sh-aqua-dark); font-weight: 800; margin-bottom: 8px;">${data.persona}</div>
          <h3 class="tab-detail-title">${data.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">${data.desc}</p>
          <div class="tab-price-box">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">初期導入構築費: ${data.initial}</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--text-primary); line-height: 1.1;">
              ${data.price} <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-secondary);">/月 (年間契約)</span>
            </div>
            <div style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 6px;">${data.meter}</div>
          </div>
          <button class="btn btn-primary trigger-download-btn" data-plan-key="${data.planKey}">
            ${data.btnText}
          </button>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 16px; color: var(--sh-aqua-dark);">
            ✨ このプランに含まれる機能 ＆ 初月オンボーディング代行:
          </h4>
          <ul class="pricing-features">
            ${data.features.map(f => `<li class="pricing-feature-item"><i>✓</i> <span>${f}</span></li>`).join("")}
          </ul>
        </div>
      </div>
    `;

    const newBtn = pricingTabContent.querySelector(".trigger-download-btn");
    if (newBtn) {
      newBtn.addEventListener("click", () => openLeadModal(data.planKey));
    }

    document.querySelectorAll(".pricing-card").forEach(card => card.classList.remove("highlighted"));
    const activeCard = document.getElementById(`card-${tabKey}`);
    if (activeCard) {
      activeCard.classList.add("highlighted");
    }
  }

  pricingTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pricingTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTabContent(btn.dataset.tab);
    });
  });

  renderTabContent("corporate");

  // --- 2. AI-OCR Live Simulator Logic ---
  const sampleData = {
    food: {
      raw: `キャベツ 1c\nトマト 3b (バラ)\n鳥モモ 10k`,
      rows: [
        { name: "キャベツ (国産)", code: "JAN: 4901234001", qty: "1", unit: "ケース (10kg)", badge: "略称「1c」自動補正" },
        { name: "ミニトマト", code: "JAN: 4901234002", qty: "3", unit: "パック (バラ)", badge: "単位「3b」自動補正" },
        { name: "若鶏モモ肉", code: "JAN: 4901234003", qty: "10", unit: "kg (不定貫)", badge: "不定貫正規化" }
      ]
    },
    parts: {
      raw: `品番: AX-102 (50c)\n型番略称: BC-01 5ケース\nSUSボルト M8 (バラ100)`,
      rows: [
        { name: "高精度軸受 AX-102", code: "PN: AX-102-STD", qty: "50", unit: "個 (1ケース)", badge: "型番「50c」ケース化" },
        { name: "ブラケット金具 BC-01", code: "PN: BC-01-SUS", qty: "5", unit: "ケース (50個包)", badge: "略称正規化" },
        { name: "ステンレスボルト M8x20", code: "PN: BOLT-M8-20", qty: "100", unit: "本 (バラ)", badge: "バラ数量自動抽出" }
      ]
    },
    medical: {
      raw: `消毒液アルコールA 20箱\n注射針 21G (ロットL-901) 100本\nガーゼ滅菌済 5c`,
      rows: [
        { name: "医療用アルコールA液 500ml", code: "MED-ALC-500", qty: "20", unit: "箱 (24本入)", badge: "箱単位正規化" },
        { name: "滅菌済注射針 21G", code: "MED-NDL-21G", qty: "100", unit: "本 (Lot: L-901)", badge: "ロット番号自動紐付け" },
        { name: "医療用ガーゼ 滅菌済", code: "MED-GAZ-ST", qty: "5", unit: "ケース (100包)", badge: "略称「5c」自動補正" }
      ]
    }
  };

  const sampleBtns = document.querySelectorAll(".sample-btn");
  const ocrInputRaw = document.getElementById("ocrInputRaw");
  const ocrOutputBody = document.getElementById("ocrOutputBody");

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sampleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const sampleKey = btn.dataset.sample;
      const data = sampleData[sampleKey];
      if (data) {
        ocrInputRaw.textContent = data.raw;
        ocrOutputBody.innerHTML = data.rows.map(row => `
          <tr>
            <td><strong>${row.name}</strong></td>
            <td><code>${row.code}</code></td>
            <td>${row.qty}</td>
            <td>${row.unit}</td>
            <td><span class="badge-corrected">${row.badge}</span></td>
          </tr>
        `).join("");
      }
    });
  });

  // --- 3. ROI Calculator Simulator Logic ---
  const calcVolume = document.getElementById("calcVolume");
  const calcStaff = document.getElementById("calcStaff");
  const calcVolumeVal = document.getElementById("calcVolumeVal");
  const calcStaffVal = document.getElementById("calcStaffVal");
  const calcHoursRes = document.getElementById("calcHoursRes");
  const calcCostRes = document.getElementById("calcCostRes");
  const calcRecPlan = document.getElementById("calcRecPlan");

  function updateCalculator() {
    const vol = parseInt(calcVolume.value, 10);
    const staff = parseInt(calcStaff.value, 10);

    calcVolumeVal.textContent = `${vol.toLocaleString()} 件 / 月`;
    calcStaffVal.textContent = `${staff} 名`;

    const monthlyHoursSaved = Math.round((vol * 0.0833) + (staff * 10));
    const monthlyCostSaved = monthlyHoursSaved * 2000;
    const annualCostSavedMan = Math.round((monthlyCostSaved * 12) / 10000);

    calcHoursRes.textContent = `${monthlyHoursSaved} 時間`;
    calcCostRes.textContent = `${annualCostSavedMan} 万円`;

    if (vol <= 400 && staff === 1) {
      calcRecPlan.textContent = "パーソナル伴走プラン (個人向け / 月額 ¥9,800)";
    } else if (vol <= 1500) {
      calcRecPlan.textContent = "マイクロBPOプラン (一人会社向け / 月額 ¥29,800)";
    } else {
      calcRecPlan.textContent = "エンタープライズBPOプラン (法人向け / 月額 ¥78,000〜)";
    }
  }

  if (calcVolume && calcStaff) {
    calcVolume.addEventListener("input", updateCalculator);
    calcStaff.addEventListener("input", updateCalculator);
    updateCalculator();
  }

  // --- 4. FAQ Accordion Logic ---
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      parent.classList.toggle("active");
    });
  });

  // --- 5. Modal Triggers & Validation Logic ---
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const leadModalForm = document.getElementById("leadModalForm");
  const modalPlanSelect = document.getElementById("modalPlan");

  function openLeadModal(planKey) {
    if (modalPlanSelect && planKey) {
      if (planKey === "corporate" || planKey.includes("エンタープライズ")) {
        modalPlanSelect.value = "corporate";
      } else if (planKey === "solo" || planKey.includes("マイクロ")) {
        modalPlanSelect.value = "solo";
      } else if (planKey === "individual" || planKey.includes("パーソナル")) {
        modalPlanSelect.value = "individual";
      }
    }
    if (modalOverlay) {
      modalOverlay.classList.add("active");
    }
  }

  document.querySelectorAll(".trigger-download-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const planKey = btn.dataset.planKey || btn.dataset.plan || "solo";
      openLeadModal(planKey);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
      }
    });
  }

  // Form Validation matching Section 3.2 Specs & Direct File Download
  if (leadModalForm) {
    leadModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Company Name
      const companyInput = document.getElementById("modalCompany");
      const fieldCompany = document.getElementById("field-modal-company");
      if (!companyInput.value.trim()) {
        fieldCompany.classList.add("has-error");
        isValid = false;
      } else {
        fieldCompany.classList.remove("has-error");
      }

      // 2. Department
      const deptSelect = document.getElementById("modalDept");
      const fieldDept = document.getElementById("field-modal-dept");
      if (!deptSelect.value) {
        fieldDept.classList.add("has-error");
        isValid = false;
      } else {
        fieldDept.classList.remove("has-error");
      }

      // 3. Last Name
      const lastNameInput = document.getElementById("modalLastName");
      const fieldLastName = document.getElementById("field-modal-lastName");
      if (!lastNameInput.value.trim()) {
        fieldLastName.classList.add("has-error");
        isValid = false;
      } else {
        fieldLastName.classList.remove("has-error");
      }

      // 4. First Name
      const firstNameInput = document.getElementById("modalFirstName");
      const fieldFirstName = document.getElementById("field-modal-firstName");
      if (!firstNameInput.value.trim()) {
        fieldFirstName.classList.add("has-error");
        isValid = false;
      } else {
        fieldFirstName.classList.remove("has-error");
      }

      // 5. Email
      const emailInput = document.getElementById("modalEmail");
      const fieldEmail = document.getElementById("field-modal-email");
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const disposableDomains = ["tempmail.com", "mailinator.com", "10minutemail.com", "trashmail.com"];
      const domain = emailVal.split("@")[1] ? emailVal.split("@")[1].toLowerCase() : "";

      if (!emailRegex.test(emailVal) || disposableDomains.includes(domain)) {
        fieldEmail.classList.add("has-error");
        document.getElementById("modalEmailErrorMsg").textContent = "有効な会社のメールアドレスをご入力ください";
        isValid = false;
      } else {
        fieldEmail.classList.remove("has-error");
      }

      // 6. Phone Number
      const phoneInput = document.getElementById("modalPhone");
      const fieldPhone = document.getElementById("field-modal-phone");
      const phoneVal = phoneInput.value.trim();

      if (phoneVal.includes("-")) {
        fieldPhone.classList.add("has-error");
        document.getElementById("modalPhoneErrorMsg").textContent = "ハイフン抜きでご入力ください（例: 08012345678）";
        isValid = false;
      } else if (!/^\d{10,11}$/.test(phoneVal)) {
        fieldPhone.classList.add("has-error");
        document.getElementById("modalPhoneErrorMsg").textContent = "半角数字10桁または11桁でご入力ください";
        isValid = false;
      } else {
        fieldPhone.classList.remove("has-error");
      }

      if (isValid) {
        modalOverlay.classList.remove("active");
        showToast("✅ ダウンロードが完了しました！お手元のフォルダをご確認ください。");

        // Generate and trigger immediate HTML/Document download in the browser
        const documentContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>【摂取資源株式会社】全業界向け BtoB受発注BPO × AI-OCR サービス概要資料</title>
  <style>
    body { font-family: sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #009aa0; border-bottom: 3px solid #00c4cc; padding-bottom: 10px; }
    .badge { background: #e6f9fa; color: #009aa0; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #cbd5e0; padding: 10px; text-align: left; }
    th { background: #0f172a; color: #fff; }
  </style>
</head>
<body>
  <span class="badge">摂取資源株式会社 公式資料</span>
  <h1>全業界・全業種対応 BtoB受発注BPO × AI-OCR サービス概要資料</h1>
  <p>ご請求いただき誠にありがとうございます。本資料では「専用の使えるAIで効率化」の全体像をお届けします。</p>
  
  <div class="box">
    <h2>1. サービスの特徴・強み</h2>
    <ul>
      <li><strong>取引先の手間ゼロ:</strong> FAX・電話・PDF注文のままで当社が100%デジタル化。</li>
      <li><strong>独自AI辞書構築:</strong> 癖字・型番略称・自社品番をAIに学習させ、データ入力精度99.9%を担保。</li>
      <li><strong>初日完全丸投げ:</strong> マスタデータ移行やAI設定は専任チームがフル代行。</li>
      <li><strong>全社経営課題の解決:</strong> 発注管理、顧客データ管理、労務管理、販売設計、新商品開発、リスクヘッジ、組織構築、仕組み化。</li>
    </ul>
  </div>

  <div class="box">
    <h2>2. 事業体別 料金プラン一覧</h2>
    <table>
      <thead>
        <tr>
          <th>プラン名</th>
          <th>初期構築費 (年間特典)</th>
          <th>月額費用</th>
          <th>対象</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>エンタープライズBPO</strong></td>
          <td>¥30,000 (通常¥20万)</td>
          <td>¥78,000〜/月</td>
          <td>中堅・大手・チーム経営</td>
        </tr>
        <tr>
          <td><strong>マイクロBPO (★一番人気)</strong></td>
          <td>¥10,000 (通常¥8万)</td>
          <td>¥29,800/月</td>
          <td>一人会社・1人社長</td>
        </tr>
        <tr>
          <td><strong>パーソナル伴走</strong></td>
          <td>¥0 (無料 / 通常¥3万)</td>
          <td>¥9,800/月</td>
          <td>個人事業主・小規模店舗</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="box">
    <h2>3. お問い合わせ・ご相談窓口</h2>
    <p>摂取資源株式会社 伴走支援担当チーム<br>
    メール: contact@intakingresources.com<br>
    理念: 30年後、全ての地域に豊かな摂取資源を提供する</p>
  </div>
</body>
</html>
        `;

        const blob = new Blob([documentContent], { type: "text/html;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "摂取資源_全業界向け受発注BPOサービス概要資料_2026.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }

  // --- 6. Helper Toast Utility ---
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.add("active");
      setTimeout(() => {
        toast.classList.remove("active");
      }, 4000);
    }
  }
});
