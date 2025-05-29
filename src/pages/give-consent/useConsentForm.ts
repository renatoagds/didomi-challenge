import { useState } from "react";
import { useNavigate } from "react-router";

export default function useConsentForm(): {
  submitting: boolean;
  handleSubmit: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  email: { value: string; valid: boolean };
  consent: { newsletter: boolean; ads: boolean; contribute: boolean };
  valid: boolean;
} {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = () => {
    setSubmitting(true);
    fetch("/consents", {
      method: "POST",
      body: JSON.stringify({
        name,
        email: email.value,
        consent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSubmitting(false);
      navigate("/collected-consents");
    });
  };

  const valid =
    (consent.newsletter || consent.ads || consent.contribute) &&
    Boolean(name) &&
    email.valid;

  return {
    submitting,
    handleSubmit,
    handleCheckboxChange,
    handleNameChange,
    handleEmailChange,
    name,
    email,
    consent,
    valid,
  };
}
