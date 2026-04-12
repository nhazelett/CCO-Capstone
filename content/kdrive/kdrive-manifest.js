/* ==========================================================================
   K DRIVE MANIFEST — Shared drive file tree for the student workstation

   This defines the folder structure and files visible in the K: drive panel.
   Files can be:
     - Static assets in content/kdrive/ (PDFs, xlsx, docx)
     - Dynamic files generated at open time (e.g., xlsx with =TODAY() dates)
     - Placeholder "preview" files that show an HTML card in-app

   File types:
     href:     path to a real downloadable file (relative to repo root)
     dynamic:  'xlsx-tracker' etc — triggers client-side generation
     preview:  inline HTML content shown in a modal

   The manifest is loaded into window.__CCO_KDRIVE by the script tag.
   ========================================================================== */

window.__CCO_KDRIVE = {
  label: 'K: Shared Drive',
  children: [
    {
      type: 'folder',
      name: 'Contracting Shop',
      children: [
        {
          type: 'folder',
          name: 'Active Contracts',
          children: [
            {
              type: 'folder',
              name: 'FA8501-24-D-0012 — Base O&M Services',
              children: [
                { type: 'file', name: 'FA8501-24-D-0012 Base Contract.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-contract.pdf', size: '2.4 MB' },
                { type: 'file', name: 'Mod 03 — Option Year 2.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-mod03.pdf', size: '890 KB' },
                { type: 'file', name: 'CLIN Summary.xlsx', icon: 'xlsx', href: 'content/kdrive/files/base-om-clins.xlsx', size: '145 KB' },
                { type: 'file', name: 'COR Appointment Letter.pdf', icon: 'pdf', href: 'content/kdrive/files/cor-appointment.pdf', size: '320 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501-23-P-0089 — Generator Fuel',
              children: [
                { type: 'file', name: 'FA8501-23-P-0089 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/gen-fuel-award.pdf', size: '1.1 MB' },
                { type: 'file', name: 'Vendor Quote — Al-Rashid Petroleum.pdf', icon: 'pdf', href: 'content/kdrive/files/alrashid-quote.pdf', size: '540 KB' },
                { type: 'file', name: 'Price Reasonableness Memo.pdf', icon: 'pdf', href: 'content/kdrive/files/fuel-price-memo.pdf', size: '280 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'BPA — Office Supplies (Al-Rashid Trading)',
              children: [
                { type: 'file', name: 'BPA Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-office-supplies.pdf', size: '680 KB', note: 'Check expiration date' },
                { type: 'file', name: 'Call Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/bpa-call-log.xlsx', size: '95 KB' },
                { type: 'file', name: 'Al-Rashid Price List 20XX.pdf', icon: 'pdf', href: 'content/kdrive/files/alrashid-pricelist.pdf', size: '210 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'GPC Purchases',
              children: [
                { type: 'file', name: 'GPC Monthly Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/gpc-log.xlsx', size: '220 KB' },
                { type: 'file', name: 'Receipts — Last 90 Days.pdf', icon: 'pdf', href: 'content/kdrive/files/gpc-receipts-90d.pdf', size: '3.8 MB' },
                { type: 'file', name: 'Cardholder Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/gpc-cardholder.pdf', size: '190 KB' }
              ]
            }
          ]
        },
        {
          type: 'folder',
          name: 'Templates',
          children: [
            { type: 'file', name: 'Sole Source J&A Template.docx', icon: 'docx', href: 'content/kdrive/files/janda-template.docx', size: '85 KB' },
            { type: 'file', name: 'CONOPS Template.docx', icon: 'docx', href: 'content/kdrive/files/conops-template.docx', size: '62 KB' },
            { type: 'file', name: 'Award Memo Template.docx', icon: 'docx', href: 'content/kdrive/files/award-memo-template.docx', size: '54 KB' },
            { type: 'file', name: 'Market Research Worksheet.xlsx', icon: 'xlsx', href: 'content/kdrive/files/market-research.xlsx', size: '78 KB' }
          ]
        },
        {
          type: 'file',
          name: 'K_Shop_Tracker_LAST_ROTATION.xlsx',
          icon: 'xlsx',
          dynamic: 'shop-tracker',
          size: '310 KB',
          note: 'Primary tracker — previous rotation. Some rows stale. Active contracts column is accurate.'
        },
        {
          type: 'file',
          name: 'Turnover Checklist.pdf',
          icon: 'pdf',
          href: 'content/kdrive/files/turnover-checklist.pdf',
          size: '120 KB'
        },
        {
          type: 'file',
          name: 'Phone Roster — 455 AEW CONS.pdf',
          icon: 'pdf',
          href: 'content/kdrive/files/phone-roster.pdf',
          size: '90 KB'
        }
      ]
    },
    {
      type: 'folder',
      name: 'FM Shop',
      children: [
        { type: 'file', name: 'Budget Execution Report — Q3.xlsx', icon: 'xlsx', href: 'content/kdrive/files/fm-budget-q3.xlsx', size: '450 KB' },
        { type: 'file', name: 'Fund Cite Authorization.pdf', icon: 'pdf', href: 'content/kdrive/files/fm-fund-cite.pdf', size: '180 KB' },
        {
          type: 'folder',
          name: 'Obligation Docs',
          children: [
            { type: 'file', name: 'PR Log — Current FY.xlsx', icon: 'xlsx', href: 'content/kdrive/files/fm-pr-log.xlsx', size: '290 KB' },
            { type: 'file', name: 'MIPR Tracker.xlsx', icon: 'xlsx', href: 'content/kdrive/files/fm-mipr-tracker.xlsx', size: '175 KB' }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'References',
      children: [
        { type: 'file', name: 'FAR Part 13 — Simplified Acquisition.pdf', icon: 'pdf', href: 'content/kdrive/files/far-part13.pdf', size: '1.2 MB' },
        { type: 'file', name: 'DFARS 213 — Contingency.pdf', icon: 'pdf', href: 'content/kdrive/files/dfars-213.pdf', size: '890 KB' },
        { type: 'file', name: 'AFMAN 64-117 — Contingency Contracting.pdf', icon: 'pdf', href: 'content/kdrive/files/afman-64-117.pdf', size: '4.1 MB' },
        { type: 'file', name: 'Local Policy Letters.pdf', icon: 'pdf', href: 'content/kdrive/files/local-policy.pdf', size: '340 KB' }
      ]
    }
  ]
};
