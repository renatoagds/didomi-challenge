import { useState } from "react";

export default function useConsentForm(): {
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  email: { value: string; valid: boolean };
  consent: { newsletter: boolean; ads: boolean; contribute: boolean };
  valid: boolean;
} {
  const [name, setName] = useState("");
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [consent, setConsent] = useState({
    newsletter: false,
    ads: false,
    contribute: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConsent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      value: event.target.value,
      valid: event.target.checkValidity(),
    });
  };

  const valid =
    (consent.newsletter || consent.ads || consent.contribute) &&
    Boolean(name) &&
    email.valid;

  return {
    handleCheckboxChange,
    handleNameChange,
    handleEmailChange,
    name,
    email,
    consent,
    valid,
  };
}
