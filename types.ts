export type Page = 'mapping' | 'schedules' | 'notes' | 'reports';

export interface TrialBalanceItem {
  id: string;
  ledger: string;
  closingCy: number;
  closingPy: number;
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

// --- Schedule Data Types ---

export interface ShareCapitalData {
  authorized: {
    count: string;
    amount: string;
  };
  issued: {
    id: string;
    class: string;
    countCy: string;
    amountCy: string;
    countPy: string;
    amountPy: string;
  }[];
}

export interface PpeRow {
  id: string;
  classOfAsset: string;
  grossBlockOpening: string;
  grossBlockAdditions: string;
  grossBlockDisposals: string;
  depreciationOpening: string;
  depreciationForYear: string;
  depreciationOnDisposals: string;
}

export interface TradeReceivablesCategory {
  secured: string;
  unsecured: string;
  doubtful: string;
}

export interface TradeReceivablesData {
  outstandingForMoreThan6Months: TradeReceivablesCategory;
  others: TradeReceivablesCategory;
  provisionForDoubtful: string;
}

export interface TradePayablesData {
    msme: string;
    others: string;
}

export interface BorrowingsData {
    id: string;
    lender: string;
    isSecured: boolean;
    amountCy: string;
    amountPy: string;
    isCurrent: boolean;
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

export interface EpsData {
    pat: string;
    preferenceDividend: string;
    weightedAvgEquityShares: string;
}

export interface ContingentLiability {
    id: string;
    nature: string;
    amountCy: string;
    amountPy: string;
}

export interface CorporateInfoData {
    companyName: string;
    cin: string;
    incorporationDate: string;
    registeredOffice: string;
}

export interface AccountingPolicy {
    id: string;
    policy: string;
}

export interface AccountingPoliciesData {
    basisOfPreparation: string;
    policies: AccountingPolicy[];
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

export interface EventsAfterBalanceSheetData {
    content: string;
}


export interface NoteSelection {
    id: string;
    name: string;
    order: number;
    isSelected: boolean;
}


export interface ScheduleData {
  isFinalized: boolean;
  shareCapital: ShareCapitalData;
  ppe: PpeRow[];
  tradeReceivables: TradeReceivablesData;
  tradePayables: TradePayablesData;
  borrowings: BorrowingsData[];
  changesInInventories: ChangesInInventoriesData;
  eps: EpsData;
  contingentLiabilities: ContingentLiability[];
  // Narrative notes data
  corporateInfo: CorporateInfoData;
  accountingPolicies: AccountingPoliciesData;
  relatedParties: RelatedPartyData;
  eventsAfterBalanceSheet: EventsAfterBalanceSheetData;
  noteSelections: NoteSelection[];
}

// --- All Data Wrapper ---

export interface AllData {
  trialBalanceData: TrialBalanceItem[];
  masters: Masters;
  scheduleData: ScheduleData;
}
