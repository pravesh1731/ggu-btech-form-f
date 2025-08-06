import React from "react";
import FormGroup from "./FormGroup";
import "../../App.css";

const DeclarationSection = ({ form, onChange }) => {
  return (
    <FormGroup>
      <label>
        DECLARATION BY THE CANDIDATE
        <span className="required">*</span>
        <div className="cerificateDesc">
          I, hereby, declare that all the particulars stated by me in this
          application form are true to the best of my knowledge and belief. I
          have read the guideline for spot counselling for admission against
          vacant seat in the b.tech first year session 2024-25 of GGU, Bilaspur
          uploaded on the University Website https://ggu.ac.in/ . I shall abide
          by the Terms and conditions therein. It is entirely my responsibility
          to prove my eligibility for admission to the programme for which I am
          admitted and also, in respect of qualifications and entitlement for
          admission against the reserved category, if claimed, to the
          satisfaction of the Institute. Further, in the event of suppression or
          distortion of any fact, like category, educational qualifications,
          etc., made in my application form, I understand that my admission, if
          granted, or degree acquired subsequently is liable to cancellation. I
          also understand that the decision of SoS E&T GGV regarding my
          admission will be final, and I shall abide by this Ordinances and
          Regulations of SoS E&T GGV from time to time.
        </div>
      </label>
      <div style={{ marginTop: "10px" }}>
        <input
          type="checkbox"
          id="agree"
          name="declaration"
          checked={form.declaration}
          onChange={onChange}
          required
        />
        <label htmlFor="agree" style={{ display: "inline", marginLeft: "8px" }}>
          I Agree
        </label>
      </div>
    </FormGroup>
  );
};

export default DeclarationSection;
