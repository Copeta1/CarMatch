import { create } from "zustand";

type Step1Form = {
  category: string;
  subcategory: string;
  modelYear: string;
  productionYear: string;
  engineType: string;
  driveType: string;
  transmissionType: string;
  enginePower: string;
  sweptVolume: string;
};

type Step2Form = {
  title: string;
  description: string;
  price: string;
  kilometers: string;
  chassisNumber: string;
  yearInTraffic: string;
  registrationInHR: string;
  selectedMonth: string;
  owner: string;
  warranty: string;
  importOption: string;
  isGaraged: boolean;
  serviceBook: boolean;
  paymentMethods: string[];
};

type Step3Form = {
  fuelConsumption: string;
  co2Emission: string;
  ecological: string;
  seats: string;
  doors: string;
  airconditioning: string;
  bodyshape: string;
  additionalequipment: string[];
  comfort: string[];
  carradio: string;
  safety: string[];
  airbags: string;
  antitheft: string[];
  suspension: string;
  autogas: boolean;
  color: string;
  metallic: boolean;
  widthTireSize: string;
  hightTireSize: string;
  diameterTireSize: string;
  videoLink: string;
};

type FormStore = {
  step1: Step1Form | null;
  step2: Step2Form | null;
  step3: Step3Form | null;
  images: string[];
  setStep1: (data: Step1Form) => void;
  setStep2: (data: Step2Form) => void;
  setStep3: (data: Step3Form) => void;
  setImages: (imgs: string[]) => void;
  getCombinedForm: () => object;
};

export const useFormStore = create<FormStore>((set, get) => ({
  step1: null,
  step2: null,
  step3: null,
  images: [],
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  setStep3: (data) => set({ step3: data }),
  setImages: (imgs) => set({ images: imgs }),
  getCombinedForm: () => {
    const { step1, step2, step3, images } = get();
    return {
      ...step1,
      ...step2,
      ...step3,
      images,
    };
  },
}));
