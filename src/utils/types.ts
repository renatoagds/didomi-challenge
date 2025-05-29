export type ConsentData = {
  id: string;
  name: string;
  email: string;
  consent: {
    newsletter: boolean;
    ads: boolean;
    contribute: boolean;
  };
};
