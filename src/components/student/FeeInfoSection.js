import React from "react";
import FormField from "../student/FormField";
import RadioGroup from "../student/RadioGroup";
import "../../App.css";

const FeeInfoSection = ({ form, onChange }) => {
  return (
    <>
      <FormField
        label="Online Registration fee Reference No."
        name="refNo"
        value={form.refNo}
        onChange={onChange}
      />

      <RadioGroup
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={onChange}
        options={[
          { value: "1000", label: "1000/-" },
          { value: "750", label: "750/-" },
        ]}
        required
      />

      <FormField
        label="Name of Drawee Bank"
        name="bank"
        value={form.bank}
        onChange={onChange}
        required
      />

      <FormField
        label="Date of Fee Payment"
        name="date_feepayment"
        type="date"
        value={form.date_feepayment}
        onChange={onChange}
        required
      />
    </>
  );
};

export default FeeInfoSection;
