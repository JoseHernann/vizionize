import { VNode } from 'vue';

export type VInputFields = {
  icon: VNode | Function | string | null;
  iconColor: string;
  borderColor: string;
  id: string;
  placeholder: string;
  label: string;
  type: string;
  modelValue: number | string | null;
};
