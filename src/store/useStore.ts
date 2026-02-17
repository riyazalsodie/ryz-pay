import { create } from 'zustand'

export type TabType = 'mobile_banking' | 'net_banking' | 'cards' | 'support' | 'faq' | 'transactions';
export type LanguageType = 'bangla' | 'english';

export interface PaymentMethod {
    id: string;
    name: string;
    img: string; // URL string
    href?: string;
    label?: string;
}

export type ModalPhase = 'selection' | 'details' | 'success';
export type SubMethodType = 'personal' | 'live' | null;
export type ViewType = 'dashboard' | 'payment_details' | 'nagad_mfs' | 'bkash_mfs' | 'rocket_mfs' | 'cellfin_mfs' | 'upay_mfs' | 'ibbl_banking';

interface StoreState {
    activeTab: TabType;
    view: ViewType;
    isModalOpen: boolean;
    modalPhase: ModalPhase;
    selectedPaymentMethod: PaymentMethod | null;
    selectedSubMethod: SubMethodType;
    language: LanguageType;

    setActiveTab: (tab: TabType) => void;
    setView: (view: ViewType) => void;
    openModal: (method: PaymentMethod) => void;
    closeModal: () => void;
    setModalPhase: (phase: ModalPhase) => void;
    setSelectedSubMethod: (sub: SubMethodType) => void;
    setLanguage: (lang: LanguageType) => void;
}

const useStore = create<StoreState>((set) => ({
    activeTab: 'mobile_banking',
    view: 'dashboard',
    isModalOpen: false,
    modalPhase: 'selection',
    selectedPaymentMethod: null,
    selectedSubMethod: null,
    language: 'bangla',

    setActiveTab: (tab) => set({ activeTab: tab }),
    setView: (view) => set({ view: view }),
    openModal: (method) => set({ isModalOpen: true, selectedPaymentMethod: method, modalPhase: 'selection', selectedSubMethod: null }),
    closeModal: () => set({ isModalOpen: false, selectedPaymentMethod: null, modalPhase: 'selection', selectedSubMethod: null }),
    setModalPhase: (phase) => set({ modalPhase: phase }),
    setSelectedSubMethod: (sub) => set({ selectedSubMethod: sub }),
    setLanguage: (lang) => set({ language: lang }),
}))

export default useStore
