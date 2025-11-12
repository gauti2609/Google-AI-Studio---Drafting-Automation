export type Page = 'mapping' | 'schedules' | 'notes' | 'reports';

// --- Trial Balance & Mapping ---
export interface TrialBalanceItem {
  id: string;
  ledger: string;
  closingCy: number; // Closing Current Year
  closingPy: number; // Closing Previous Year
  isMapped: boolean;
  majorHeadCode: string | null;
  minorHeadCode: string | null;
  groupingCode: string | null;
}

export interface MajorHead {
  code: string;
  name: string;
}

export interface MinorHead {
  code: string;
  name: string;
  majorHeadCode: string;
}

export interface Grouping {
  code: string;
  name: string;
  minorHeadCode: string;
}

export interface Masters {
  majorHeads: MajorHead[];
  minorHeads: MinorHead[];
  groupings: Grouping[];
}

export interface MappingSuggestion {
    majorHeadCode: string;
    minorHeadCode: string;
    groupingCode: string;
    confidence: number;
    reasoning: string;
}

// --- Schedule Data ---

export type RoundingUnit = 'ones' | 'hundreds' | 'thousands' | 'lakhs' | 'millions' | 'crores';

export interface CorporateInfoData {
    companyName: string;
    cin: string;
    incorporationDate: string;
    registeredOffice: string;
    currencySymbol: string;
    roundingUnit: RoundingUnit;
}

export interface AccountingPolicy {
    id: string;
    title: string;
    policy: string;
}

export interface AccountingPoliciesData {
    basisOfPreparation: string;
    policies: AccountingPolicy[];
}

export interface ShareCapitalItem {
    id: string;
    particular: string;
    noOfSharesCy: string;
    amountCy: string;
    noOfSharesPy: string;
    amountPy: string;
}

export interface ShareReconciliationItem {
    id: string;
    particular: string;
    noOfShares: string;
    amount: string;
}

export interface Shareholder {
    id: string;
    name: string;
    noOfShares: string;
    percentage: string;
}

export interface PromoterShareholding {
    id: string;
    promoterName: string;
    noOfShares: string;
    percentageTotal: string;
    percentageChange: string;
}

export interface ShareCapitalData {
    authorized: ShareCapitalItem[];
    issued: ShareCapitalItem[];
    subscribed: ShareCapitalItem[];
    reconciliationCy: ShareReconciliationItem[];
    reconciliationPy: ShareReconciliationItem[];
    rightsPreferences: string;
    holdingCompanyShares: string;
    shareholders: Shareholder[];
    fiveYearHistoryBonus: string;
    fiveYearHistoryNoCash: string;
    fiveYearHistoryBuyback: string;
    convertibleSecurities: string;
    callsUnpaid: string;
    forfeitedShares: string;
    promoterShareholding: PromoterShareholding[];
}

export interface OtherEquityItem {
    id: string;
    reserveName: string;
    opening: string;
    additions: string;
    deductions: string;
    closing: string; // Calculated
}

export interface BorrowingItem {
    id: string;
    nature: string;
    isSecured: boolean;
    currency: string;
    amountCy: string;
    amountPy: string;
    repaymentTerms: string;
}

export interface BorrowingsData {
    longTerm: BorrowingItem[];
    shortTerm: BorrowingItem[];
    reissuableBonds: string;
}

export type TradePayablesAgeingCategory = 'msme' | 'others' | 'disputedMsme' | 'disputedOthers';

export interface TradePayablesAgeingRow {
    category: TradePayablesAgeingCategory;
    lessThan1Year: string;
    '1To2Years': string;
    '2To3Years': string;
    moreThan3Years: string;
}

export interface MsmeDisclosureData {
    principalAndInterestDue: string;
    interestPaid: string;
    interestDueAndPayable: string;
    interestAccruedAndUnpaid: string;
    furtherInterest: string;
}

export interface TradePayablesData {
    ageing: TradePayablesAgeingRow[];
    msmeDisclosures: MsmeDisclosureData;
}

export interface PpeAssetRow {
    id: string;
    assetClass: string;
    isUnderLease: boolean;
    grossBlockOpening: string;
    grossBlockAdditions: string;
    grossBlockDisposals: string;
    grossBlockClosing: string; // Calculated
    depreciationOpening: string;
    depreciationForYear: string;
    depreciationOnDisposals: string;
    depreciationClosing: string; // Calculated
    netBlockClosing: string; // Calculated
}

export interface CwipAssetRow {
    // TBD if needed
}

export interface AssetAgeingRow {
    id: string;
    particular: string;
    lessThan1Year: string;
    '1To2Years': string;
    '2To3Years': string;
    moreThan3Years: string;
}


export interface CWIPRow {
  id: string;
  particular: string;
  opening: string;
  additions: string;
  capitalized: string;
  closing: string; // Calculated
}

export interface InventoryBalanceRow {
    id: string;
    item: string;
    amountCy: string;
    amountPy: string;
}

export type TradeReceivablesAgeingCategory = 'undisputedGood' | 'undisputedDoubtful' | 'disputedGood' | 'disputedDoubtful';

export interface TradeReceivablesAgeingRow {
    category: TradeReceivablesAgeingCategory;
    lessThan6Months: string;
    '6MonthsTo1Year': string;
    '1To2Years': string;
    '2To3Years': string;
    moreThan3Years: string;
}

export interface TradeReceivablesData {
    securedGood: string;
    unsecuredGood: string;
    doubtful: string;
    provisionForDoubtful: string;
    ageing: TradeReceivablesAgeingRow[];
}

export interface CashComponent {
    id: string;
    particular: string;
    amountCy: string;
    amountPy: string;
}
export interface CashAndCashEquivalentsData {
    cashOnHand: string;
    balancesWithBanks: CashComponent[];
    chequesDraftsOnHand: string;
    others: CashComponent[];
    repatriationRestrictions: string;
}

export interface GenericScheduleItem {
    id: string;
    particular: string;
    amountCy: string;
    amountPy: string;
}

export interface InvestmentItem extends GenericScheduleItem {
    basisOfValuation?: string;
}

export interface InvestmentsScheduleData {
    items: InvestmentItem[];
    provisionForDiminution: string;
}

export interface LoanAdvanceItem extends GenericScheduleItem {
    // any specific fields?
}

export interface LoansAndAdvancesScheduleData {
    items: LoanAdvanceItem[];
    allowanceForBadAndDoubtful: string;
}


export interface InventoryRow {
    id: string;
    name: string;
    amountCy: string;
    amountPy: string;
}

export interface ChangesInInventoriesData {
    opening: InventoryRow[];
    closing: InventoryRow[];
}

export interface EmployeeBenefitsData {
    salariesAndWages: string;
    contributionToFunds: string;
    staffWelfare: string;
}

export interface TaxExpenseData {
    currentTax: string;
    deferredTax: string;
}

export interface EpsData {
    pat: string;
    preferenceDividend: string;
    weightedAvgEquityShares: string;
}

export interface RelatedParty {
    id: string;
    name: string;
    relationship: string;
}

export interface RelatedPartyTransaction {
    id: string;
    relatedPartyId: string;
    nature: string;
    amountCy: string;
    amountPy: string;
}

export interface RelatedPartyData {
    parties: RelatedParty[];
    transactions: RelatedPartyTransaction[];
}

export interface ContingentLiability {
    id: string;
    nature: string;
    amountCy: string;
    amountPy: string;
}

export interface EventsAfterBalanceSheetData {
    content: string;
}

export interface ForeignExchangeData {
    earnings: GenericScheduleItem[];
    expenditure: GenericScheduleItem[];
}

export interface RatioExplanation {
    id: string;
    explanationCy: string;
    explanationPy: string;
}

export interface DeferredTaxRow {
    id: string;
    particular: string;
    openingBalance: string;
    pnlCharge: string;
    closingBalance: string; // Calculated
}

export interface DeferredTaxData {
    assets: DeferredTaxRow[];
    liabilities: DeferredTaxRow[];
}

export interface CsrData {
    required: string;
    spent: string;
    shortfall: string;
    reason: string;
}

export interface CryptoData {
    profitOrLoss: string;
    amountHeld: string;
    advances: string;
}

export interface FundUtilisationIntermediary {
    id: string;
    name: string;
    date: string;
    amount: string;
}

export interface FundUtilisationUltimate {
    id: string;
    name: string;
    date: string;
    amount: string;
}

export interface FundUtilisationGuarantee {
    id: string;
    name: string;
    date: string;
    amount: string;
}


export interface FundUtilisationData {
    intermediaries: FundUtilisationIntermediary[];
    ultimateBeneficiaries: FundUtilisationUltimate[];
    guarantees: FundUtilisationGuarantee[];
}

export interface AdditionalRegulatoryInfoData {
    csr: CsrData;
    crypto: CryptoData;
    registrationOfCharges: string;
    layerCompliance: string;
    schemeOfArrangements: string;
    fundUtilisation: FundUtilisationData;
    undisclosedIncome: string;
}


// --- Main ScheduleData structure ---
export interface ScheduleData {
    isFinalized: boolean;
    corporateInfo: CorporateInfoData;
    accountingPolicies: AccountingPoliciesData;
    shareCapital: ShareCapitalData;
    otherEquity: OtherEquityItem[];
    borrowings: BorrowingsData;
    tradePayables: TradePayablesData;
    ppe: PpeAssetRow[];
    cwip: CWIPRow[];
    cwipAgeing: AssetAgeingRow[];
    intangibleAssets: PpeAssetRow[]; // Re-using PPE structure
    intangibleAssetsUnderDevelopmentMovement: CWIPRow[];
    intangibleAssetsUnderDevelopmentAgeing: AssetAgeingRow[];
    investments: InvestmentsScheduleData;
    loansAndAdvances: LoansAndAdvancesScheduleData; 
    inventories: InventoryBalanceRow[];
    inventoriesValuationMode: string;
    tradeReceivables: TradeReceivablesData;
    longTermTradeReceivables: TradeReceivablesData;
    cashAndCashEquivalents: CashAndCashEquivalentsData;
    revenueFromOps: GenericScheduleItem[];
    otherIncome: GenericScheduleItem[];
    costOfMaterialsConsumed: ChangesInInventoriesData;
    purchases: GenericScheduleItem[];
    changesInInventories: ChangesInInventoriesData;
    employeeBenefits: EmployeeBenefitsData;
    financeCosts: GenericScheduleItem[];
    otherExpenses: GenericScheduleItem[];
    taxExpense: TaxExpenseData;
    exceptionalItems: GenericScheduleItem[];
    eps: EpsData;
    relatedParties: RelatedPartyData;
    contingentLiabilities: ContingentLiability[];
    commitments: ContingentLiability[]; // Re-using structure
    eventsAfterBalanceSheet: EventsAfterBalanceSheetData;
    foreignExchange: ForeignExchangeData;
    auditorPayments: GenericScheduleItem[];
    additionalRegulatoryInfo: AdditionalRegulatoryInfoData;
    deferredTax: DeferredTaxData;
    ratioExplanations: Record<string, RatioExplanation>;
    noteSelections: {id: string, name: string, order: number, isSelected: boolean}[];
}


// --- AllData Wrapper ---
export interface AllData {
    trialBalanceData: TrialBalanceItem[];
    masters: Masters;
    scheduleData: ScheduleData;
}