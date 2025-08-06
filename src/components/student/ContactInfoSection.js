import React from "react";
import FormField from "./FormField";
import "../../App.css";

const ContactInfoSection = ({ form, onChange }) => {
  return (
    <>
      <FormField
        label="Address for Correspondence"
        name="address"
        type="textarea"
        value={form.address}
        onChange={onChange}
        required
      />

      <FormField
        label="Mobile No. (Preferable WhatsApp)"
        name="mobile"
        type="tel"
        value={form.mobile}
        onChange={onChange}
        required
      />

      <FormField
        label="Alternate Mobile No. (Preferable WhatsApp)"
        name="altMobile"
        type="tel"
        value={form.altMobile}
        onChange={onChange}
      />
    </>
  );
};

export default ContactInfoSection;
