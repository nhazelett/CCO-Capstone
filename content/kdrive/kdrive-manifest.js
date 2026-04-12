/* ==========================================================================
   K DRIVE MANIFEST — Shared drive file tree for the student workstation

   Contract numbering: FA8501XXD#### (delivery/task orders, IDIQs)
                       FA8501XXP#### (purchase orders)
                       BPA-#### (blanket purchase agreements)
   XX = fiscal year placeholder so exercises don't look dated.
   No dashes within the contract number (AF style).
   No C-type contracts.

   File types:
     href:     path to a real downloadable file (relative to repo root)
     dynamic:  triggers client-side generation (e.g., shop-tracker)
     preview:  inline HTML content shown in a modal
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
            /* ============ IDIQs ============ */
            {
              type: 'folder',
              name: 'FA8501XXD0012 — Base O&M Services (IDIQ)',
              children: [
                { type: 'file', name: 'FA8501XXD0012 Base Contract.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-contract.pdf', size: '2.4 MB' },
                { type: 'file', name: 'TO 001 — Grounds Maintenance.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-to001.pdf', size: '720 KB' },
                { type: 'file', name: 'TO 002 — Facility Custodial.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-to002.pdf', size: '680 KB' },
                { type: 'file', name: 'Mod 03 — Option Year 2.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-mod03.pdf', size: '890 KB' },
                { type: 'file', name: 'CLIN Summary.xlsx', icon: 'xlsx', href: 'content/kdrive/files/base-om-clins.xlsx', size: '145 KB' },
                { type: 'file', name: 'COR Appointment Letter.pdf', icon: 'pdf', href: 'content/kdrive/files/cor-appointment-om.pdf', size: '320 KB' },
                { type: 'file', name: 'Past Performance Eval — Yr 1.pdf', icon: 'pdf', href: 'content/kdrive/files/base-om-ppeval.pdf', size: '410 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXD0034 — Vehicle Lease & Maintenance (IDIQ)',
              children: [
                { type: 'file', name: 'FA8501XXD0034 Base Contract.pdf', icon: 'pdf', href: 'content/kdrive/files/vehicle-idiq-base.pdf', size: '1.8 MB' },
                { type: 'file', name: 'TO 001 — 12x Pickup Trucks.pdf', icon: 'pdf', href: 'content/kdrive/files/vehicle-to001-pickups.pdf', size: '540 KB' },
                { type: 'file', name: 'TO 002 — 4x Flatbed Utility.pdf', icon: 'pdf', href: 'content/kdrive/files/vehicle-to002-flatbed.pdf', size: '480 KB' },
                { type: 'file', name: 'TO 003 — Maintenance Svc Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/vehicle-to003-maint.pdf', size: '620 KB' },
                { type: 'file', name: 'Fleet Status Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/vehicle-fleet-log.xlsx', size: '195 KB' },
                { type: 'file', name: 'COR Appointment Letter.pdf', icon: 'pdf', href: 'content/kdrive/files/cor-appointment-veh.pdf', size: '310 KB' },
                { type: 'file', name: 'Vendor Insurance Cert.pdf', icon: 'pdf', href: 'content/kdrive/files/vehicle-insurance.pdf', size: '250 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXD0051 — Cell Phones & Comms (IDIQ)',
              children: [
                { type: 'file', name: 'FA8501XXD0051 Base Contract.pdf', icon: 'pdf', href: 'content/kdrive/files/cell-idiq-base.pdf', size: '1.6 MB' },
                { type: 'file', name: 'TO 001 — 40x Handsets + Plans.pdf', icon: 'pdf', href: 'content/kdrive/files/cell-to001-handsets.pdf', size: '390 KB' },
                { type: 'file', name: 'TO 002 — Sat Phone Rental (6 ea).pdf', icon: 'pdf', href: 'content/kdrive/files/cell-to002-satphone.pdf', size: '310 KB' },
                { type: 'file', name: 'Device Inventory.xlsx', icon: 'xlsx', href: 'content/kdrive/files/cell-inventory.xlsx', size: '88 KB' },
                { type: 'file', name: 'Monthly Usage Report Template.xlsx', icon: 'xlsx', href: 'content/kdrive/files/cell-usage-template.xlsx', size: '72 KB' },
                { type: 'file', name: 'COR Appointment Letter.pdf', icon: 'pdf', href: 'content/kdrive/files/cor-appointment-cell.pdf', size: '305 KB' }
              ]
            },

            /* ============ BPAs ============ */
            {
              type: 'folder',
              name: 'BPA0001 — Office Supplies (Al Rashid Trading)',
              children: [
                { type: 'file', name: 'BPA Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-office-supplies.pdf', size: '680 KB', note: 'Check expiration — may need renewal' },
                { type: 'file', name: 'Call Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/bpa-office-calllog.xlsx', size: '95 KB' },
                { type: 'file', name: 'Al Rashid Price List 20XX.pdf', icon: 'pdf', href: 'content/kdrive/files/alrashid-pricelist.pdf', size: '210 KB' },
                { type: 'file', name: 'Market Research — Comparable Vendors.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-office-mktresearch.pdf', size: '340 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'BPA0002 — Bottled Water & Rations',
              children: [
                { type: 'file', name: 'BPA Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-water-agreement.pdf', size: '590 KB' },
                { type: 'file', name: 'Call Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/bpa-water-calllog.xlsx', size: '82 KB' },
                { type: 'file', name: 'Delivery Schedule.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-water-schedule.pdf', size: '160 KB' },
                { type: 'file', name: 'Quality Assurance Checklist.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-water-qa.pdf', size: '120 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'BPA0003 — Portable Latrine Servicing',
              children: [
                { type: 'file', name: 'BPA Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-latrine-agreement.pdf', size: '420 KB' },
                { type: 'file', name: 'Call Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/bpa-latrine-calllog.xlsx', size: '68 KB' },
                { type: 'file', name: 'Service Schedule Map.pdf', icon: 'pdf', href: 'content/kdrive/files/bpa-latrine-map.pdf', size: '1.2 MB' }
              ]
            },

            /* ============ PURCHASE ORDERS ============ */
            {
              type: 'folder',
              name: 'FA8501XXP0089 — Generator Fuel Delivery',
              children: [
                { type: 'file', name: 'FA8501XXP0089 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fuel-award.pdf', size: '1.1 MB' },
                { type: 'file', name: 'Vendor Quote — Al Rashid Petroleum.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fuel-quote.pdf', size: '540 KB' },
                { type: 'file', name: 'Price Reasonableness Memo.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fuel-pricememo.pdf', size: '280 KB' },
                { type: 'file', name: 'Delivery Receipt Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/po-fuel-receipts.xlsx', size: '105 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0102 — Perimeter Fence Repair',
              children: [
                { type: 'file', name: 'FA8501XXP0102 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fence-award.pdf', size: '780 KB' },
                { type: 'file', name: 'SOW — Fence Sections 4 thru 7.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fence-sow.pdf', size: '450 KB' },
                { type: 'file', name: 'Site Photos.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fence-photos.pdf', size: '6.2 MB' },
                { type: 'file', name: 'Inspection Checklist.pdf', icon: 'pdf', href: 'content/kdrive/files/po-fence-inspection.pdf', size: '190 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0115 — HVAC Compressor Replacement',
              children: [
                { type: 'file', name: 'FA8501XXP0115 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-hvac-award.pdf', size: '920 KB' },
                { type: 'file', name: 'Sole Source J&A.pdf', icon: 'pdf', href: 'content/kdrive/files/po-hvac-janda.pdf', size: '380 KB' },
                { type: 'file', name: 'Vendor Technical Proposal.pdf', icon: 'pdf', href: 'content/kdrive/files/po-hvac-techprop.pdf', size: '1.4 MB' },
                { type: 'file', name: 'COR Appointment Letter.pdf', icon: 'pdf', href: 'content/kdrive/files/cor-appointment-hvac.pdf', size: '310 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0128 — Portable Generator Rental (3 ea)',
              children: [
                { type: 'file', name: 'FA8501XXP0128 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-genrental-award.pdf', size: '650 KB' },
                { type: 'file', name: 'Quotes (3 Vendors).pdf', icon: 'pdf', href: 'content/kdrive/files/po-genrental-quotes.pdf', size: '870 KB' },
                { type: 'file', name: 'Rental Agreement Terms.pdf', icon: 'pdf', href: 'content/kdrive/files/po-genrental-terms.pdf', size: '340 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0141 — Barrier Materials (Hesco & Sandbags)',
              children: [
                { type: 'file', name: 'FA8501XXP0141 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-barrier-award.pdf', size: '580 KB' },
                { type: 'file', name: 'Delivery Schedule.pdf', icon: 'pdf', href: 'content/kdrive/files/po-barrier-schedule.pdf', size: '210 KB' },
                { type: 'file', name: 'Receipt & Acceptance.pdf', icon: 'pdf', href: 'content/kdrive/files/po-barrier-receipt.pdf', size: '290 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0156 — Laundry Equipment Purchase',
              children: [
                { type: 'file', name: 'FA8501XXP0156 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-laundry-award.pdf', size: '720 KB' },
                { type: 'file', name: 'Market Research Report.pdf', icon: 'pdf', href: 'content/kdrive/files/po-laundry-mktresearch.pdf', size: '460 KB' },
                { type: 'file', name: 'Warranty Documentation.pdf', icon: 'pdf', href: 'content/kdrive/files/po-laundry-warranty.pdf', size: '180 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0163 — IT Network Switches (Qty 8)',
              children: [
                { type: 'file', name: 'FA8501XXP0163 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-network-award.pdf', size: '830 KB' },
                { type: 'file', name: 'Sole Source J&A — Cisco Compatibility.pdf', icon: 'pdf', href: 'content/kdrive/files/po-network-janda.pdf', size: '420 KB' },
                { type: 'file', name: 'Property Receipt.pdf', icon: 'pdf', href: 'content/kdrive/files/po-network-property.pdf', size: '260 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0177 — Force Protection Lighting',
              children: [
                { type: 'file', name: 'FA8501XXP0177 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-lighting-award.pdf', size: '690 KB' },
                { type: 'file', name: 'SOW — Perimeter & Entry Points.pdf', icon: 'pdf', href: 'content/kdrive/files/po-lighting-sow.pdf', size: '510 KB' },
                { type: 'file', name: 'Installation Acceptance.pdf', icon: 'pdf', href: 'content/kdrive/files/po-lighting-acceptance.pdf', size: '330 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0184 — Medical Supplies Restock',
              children: [
                { type: 'file', name: 'FA8501XXP0184 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-medsupply-award.pdf', size: '560 KB' },
                { type: 'file', name: 'Quotes — 3 Vendors.pdf', icon: 'pdf', href: 'content/kdrive/files/po-medsupply-quotes.pdf', size: '740 KB' },
                { type: 'file', name: 'Approved Product List.xlsx', icon: 'xlsx', href: 'content/kdrive/files/po-medsupply-prodlist.xlsx', size: '115 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0199 — Concrete Pad (Helicopter Landing)',
              children: [
                { type: 'file', name: 'FA8501XXP0199 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-concrete-award.pdf', size: '950 KB' },
                { type: 'file', name: 'SOW & Drawings.pdf', icon: 'pdf', href: 'content/kdrive/files/po-concrete-sow.pdf', size: '3.2 MB' },
                { type: 'file', name: 'Vendor Performance Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/po-concrete-perflog.xlsx', size: '92 KB' },
                { type: 'file', name: 'Final Inspection Report.pdf', icon: 'pdf', href: 'content/kdrive/files/po-concrete-inspection.pdf', size: '440 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'FA8501XXP0208 — Fire Suppression System Maint',
              children: [
                { type: 'file', name: 'FA8501XXP0208 Award.pdf', icon: 'pdf', href: 'content/kdrive/files/po-firesup-award.pdf', size: '610 KB' },
                { type: 'file', name: 'Inspection Schedule.pdf', icon: 'pdf', href: 'content/kdrive/files/po-firesup-schedule.pdf', size: '180 KB' },
                { type: 'file', name: 'Certification of Compliance.pdf', icon: 'pdf', href: 'content/kdrive/files/po-firesup-cert.pdf', size: '220 KB' }
              ]
            },

            /* ============ GPC ============ */
            {
              type: 'folder',
              name: 'GPC Purchases',
              children: [
                { type: 'file', name: 'GPC Monthly Log.xlsx', icon: 'xlsx', href: 'content/kdrive/files/gpc-log.xlsx', size: '220 KB' },
                { type: 'file', name: 'Receipts — Last 90 Days.pdf', icon: 'pdf', href: 'content/kdrive/files/gpc-receipts-90d.pdf', size: '3.8 MB' },
                { type: 'file', name: 'Cardholder Agreement.pdf', icon: 'pdf', href: 'content/kdrive/files/gpc-cardholder.pdf', size: '190 KB' },
                { type: 'file', name: 'Approving Official Designation.pdf', icon: 'pdf', href: 'content/kdrive/files/gpc-ao-designation.pdf', size: '150 KB' }
              ]
            },

            /* ============ PENDING / UNFUNDED ============ */
            {
              type: 'folder',
              name: 'PENDING — DFAC Fryer Repair',
              children: [
                { type: 'file', name: 'CE Work Request.pdf', icon: 'pdf', href: 'content/kdrive/files/pending-dfac-workreq.pdf', size: '340 KB', note: 'Awaiting fund cite from FM' },
                { type: 'file', name: 'Vendor Estimate.pdf', icon: 'pdf', href: 'content/kdrive/files/pending-dfac-estimate.pdf', size: '210 KB' },
                { type: 'file', name: 'PR Draft.pdf', icon: 'pdf', href: 'content/kdrive/files/pending-dfac-pr.pdf', size: '180 KB' }
              ]
            },
            {
              type: 'folder',
              name: 'PENDING — Airfield Lighting MIPR',
              children: [
                { type: 'file', name: 'MIPR Document.pdf', icon: 'pdf', href: 'content/kdrive/files/pending-airfield-mipr.pdf', size: '480 KB', note: 'Stale from last rotation — verify w/ FM' },
                { type: 'file', name: 'Previous Rotation Notes.docx', icon: 'docx', href: 'content/kdrive/files/pending-airfield-notes.docx', size: '95 KB' }
              ]
            }
          ]
        },
        {
          type: 'folder',
          name: 'Templates',
          children: [
            { type: 'file', name: 'Sole Source J&A Template.docx', icon: 'docx', href: 'content/kdrive/files/tpl-janda.docx', size: '85 KB' },
            { type: 'file', name: 'CONOPS Template.docx', icon: 'docx', href: 'content/kdrive/files/tpl-conops.docx', size: '62 KB' },
            { type: 'file', name: 'Award Memo Template.docx', icon: 'docx', href: 'content/kdrive/files/tpl-award-memo.docx', size: '54 KB' },
            { type: 'file', name: 'Price Reasonableness Memo Template.docx', icon: 'docx', href: 'content/kdrive/files/tpl-price-memo.docx', size: '48 KB' },
            { type: 'file', name: 'Market Research Worksheet.xlsx', icon: 'xlsx', href: 'content/kdrive/files/tpl-market-research.xlsx', size: '78 KB' },
            { type: 'file', name: 'BPA Call Template.docx', icon: 'docx', href: 'content/kdrive/files/tpl-bpa-call.docx', size: '42 KB' },
            { type: 'file', name: 'Receiving Report (DD250).pdf', icon: 'pdf', href: 'content/kdrive/files/tpl-dd250.pdf', size: '110 KB' },
            { type: 'file', name: 'Contract Closeout Checklist.docx', icon: 'docx', href: 'content/kdrive/files/tpl-closeout.docx', size: '56 KB' }
          ]
        },
        {
          type: 'file',
          name: 'K_Shop_Tracker_LAST_ROTATION.xlsx',
          icon: 'xlsx',
          dynamic: 'shop-tracker',
          size: '310 KB',
          note: 'Primary tracker — previous rotation. Some rows stale.'
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
        { type: 'file', name: 'AFFARS Appendix CC.pdf', icon: 'pdf', href: 'content/kdrive/files/affars-cc.pdf', size: '2.3 MB' },
        { type: 'file', name: 'Local Policy Letters.pdf', icon: 'pdf', href: 'content/kdrive/files/local-policy.pdf', size: '340 KB' },
        { type: 'file', name: 'Theater Business Clearance Checklist.pdf', icon: 'pdf', href: 'content/kdrive/files/theater-biz-clearance.pdf', size: '275 KB' }
      ]
    }
  ]
};
