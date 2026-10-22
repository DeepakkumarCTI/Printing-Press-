
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import FormField, { inputClass } from "../components/FormField";
import Button from "../components/Button";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  size: "",
  material: "",
  deadline: "",
  details: "",
};

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#967019] sm:text-xs">
      {children}
    </p>
  );
}

function Feature({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xs font-extrabold text-[#E0B12E]">
        {number}
      </span>
      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-white/55">{description}</p>
      </div>
    </div>
  );
}

export default function Quote() {
  const { createQuote, products } = useStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [designFile, setDesignFile] = useState(null);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");

  const change = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setFileError("");
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFileError("Please upload a JPG, PNG, WEBP, or PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("Your file must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setDesignFile(file);
  };

  const removeFile = () => {
    setDesignFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.details.trim()
    ) {
      setError(
        "Please complete your name, email, phone number, and project details."
      );
      return;
    }

    /*
      Important:
      createQuote currently saves the quote in your local demo store.
      The file is converted to a data URL so it can be included with
      the quote object. Your StoreContext must preserve this property.
    */
    let designImage = "";

    if (designFile) {
      try {
        designImage = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("File could not be read."));
          reader.readAsDataURL(designFile);
        });
      } catch {
        setError("The design file could not be read. Please try again.");
        return;
      }
    }

    try {
      const quote = createQuote({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        details: form.details.trim(),
        designName: designFile?.name || "",
        designImage,
        designFileType: designFile?.type || "",
      });

      navigate(`/ quote - success / ${ quote.id } `);
    } catch {
      setError("Unable to submit your request. Please try again.");
    }
  };

  const selectedProduct = products.find(
    (product) => product.name === form.product
  );

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#38343A]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-36 left-[38%] h-80 w-80 rounded-full border-[45px] border-[#E0B12E]/[0.07]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E0B12E]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F0D88C]">
                Custom printing services
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your idea.
              <span className="block text-[#E0B12E]">
                Our print expertise.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Tell us what you have in mind. From business essentials to
              completely custom projects, we will help bring your ideas to
              life with the right materials, finishes, and pricing.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Feature
                number="01"
                title="Made for your needs"
                description="Choose your size, quantity, material, and finish."
              />
              <Feature
                number="02"
                title="Personalized quotes"
                description="Share your requirements for a tailored estimate."
              />
              <Feature
                number="03"
                title="Share your design"
                description="Attach your artwork or a reference file."
              />
              <Feature
                number="04"
                title="Clear communication"
                description="Include your deadline and special instructions."
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm xl:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SectionLabel>Start your project</SectionLabel>
                  <h2 className="mt-3 text-2xl font-black text-white">
                    Let's make it happen.
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E0B12E] text-xl font-black text-[#38343A]">
                  P
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  "Tell us about your project",
                  "Choose your print specifications",
                  "Upload a design reference",
                  "Submit your quote request",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-[#E0B12E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/75">{step}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-[#E0B12E]/20 bg-[#E0B12E]/[0.07] p-4">
                <p className="text-sm font-bold text-[#F0D88C]">
                  Have a special requirement?
                </p>
                <p className="mt-2 text-xs leading-6 text-white/60">
                  Include as much detail as possible so we can better
                  understand your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote form and contact information */}
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:px-8">
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#E5DED3] bg-white p-5 shadow-sm sm:p-6">
            <SectionLabel>Before you begin</SectionLabel>
            <h2 className="mt-3 text-xl font-black tracking-tight text-[#38343A]">
              Help us understand your vision.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#77716B]">
              Complete the form with your printing requirements. The more
              details you provide, the easier it is to understand what you
              need.
            </p>

            <div className="mt-5 space-y-3 border-t border-[#EEE8DE] pt-5">
              {[
                "Your preferred product and quantity",
                "Size, material, and finish",
                "Project deadline",
                "Design or reference artwork",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7F1E4] text-[10px] font-black text-[#967019]">
                    ✓
                  </span>
                  <p className="text-sm leading-5 text-[#5F5953]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#EEE7DA] p-5 sm:p-6">
            <SectionLabel>Contact information</SectionLabel>
            <h2 className="mt-3 text-xl font-black text-[#38343A]">
              Prefer to talk to us?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#77716B]">
              Printora Studio
              <br />
              24, Main Road, Palayamkottai,
              <br />
              Tirunelveli, Tamil Nadu – 627002, India
            </p>

            <a
              href="tel:+919876543210"
              className="mt-5 flex items-center gap-3 rounded-xl border border-[#DED5C4] bg-white/70 p-3 transition hover:border-[#D9AD32]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#38343A] text-sm font-bold text-white">
                T
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8A8379]">
                  Call us
                </span>
                <span className="mt-1 block text-sm font-extrabold text-[#38343A]">
                  +91 98765 43210
                </span>
              </span>
            </a>

            <a
              href="mailto:printorastudio@example.com"
              className="mt-3 flex min-w-0 items-center gap-3 rounded-xl border border-[#DED5C4] bg-white/70 p-3 transition hover:border-[#D9AD32]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#38343A] text-sm font-bold text-white">
                @
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8A8379]">
                  Email us
                </span>
                <span className="mt-1 block break-all text-sm font-extrabold text-[#38343A]">
                  printorastudio@example.com
                </span>
              </span>
            </a>
          </div>

          <div className="rounded-2xl border border-[#E5DED3] bg-white p-5">
            <p className="text-sm font-extrabold text-[#38343A]">
              Your information matters
            </p>
            <p className="mt-2 text-xs leading-6 text-[#77716B]">
              Please do not upload confidential documents or sensitive
              personal information with your design.
            </p>
          </div>
        </aside>

        {/* Main form */}
        <form
          onSubmit={submit}
          className="min-w-0 overflow-hidden rounded-3xl border border-[#E5DED3] bg-white shadow-sm"
        >
          <div className="border-b border-[#EEE8DE] p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <SectionLabel>Custom enquiry form</SectionLabel>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#38343A] sm:text-3xl">
                  Request a quote
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#77716B]">
                  Tell us about your project and we will have the details
                  needed to review your request.
                </p>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center rounded-lg bg-[#F7F1E4] px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#725514]">
                * Required fields
              </span>
            </div>
          </div>

          <div className="space-y-8 p-5 sm:p-8">
            {/* Customer information */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E4] text-sm font-black text-[#967019]">
                  01
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#38343A]">
                    Your information
                  </h3>
                  <p className="mt-1 text-xs text-[#8A8379]">
                    How can we get in touch with you?
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Full name" required>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => change("name", e.target.value)}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </FormField>

                <FormField label="Email address" required>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => change("email", e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </FormField>

                <FormField label="Phone number" required>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => change("phone", e.target.value)}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </FormField>

                <FormField label="Product / service">
                  <select
                    value={form.product}
                    onChange={(e) => change("product", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a product or service</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                    <option value="Other / custom project">
                      Other / custom project
                    </option>
                  </select>
                </FormField>
              </div>
            </section>

            <div className="border-t border-[#EEE8DE]" />

            {/* Project specifications */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E4] text-sm font-black text-[#967019]">
                  02
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#38343A]">
                    Project specifications
                  </h3>
                  <p className="mt-1 text-xs text-[#8A8379]">
                    Define the details of your print order.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Estimated quantity">
                  <input
                    value={form.quantity}
                    onChange={(e) => change("quantity", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 500 pieces"
                  />
                </FormField>

                <FormField label="Required by">
                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={form.deadline}
                    onChange={(e) => change("deadline", e.target.value)}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Size / dimensions">
                  <input
                    value={form.size}
                    onChange={(e) => change("size", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. A4, 3 × 5 ft"
                  />
                </FormField>

                <FormField label="Material / finish">
                  <input
                    value={form.material}
                    onChange={(e) => change("material", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. matte, glossy, cotton"
                  />
                </FormField>
              </div>

              {selectedProduct && (
                <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#EEE8DE] bg-[#FCFAF6] p-3">
                  {selectedProduct.image && (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#8A8379]">
                      Selected product
                    </p>
                    <p className="mt-1 break-words text-sm font-extrabold text-[#38343A]">
                      {selectedProduct.name}
                    </p>
                    <p className="mt-1 text-xs text-[#967019]">
                      Starting from ₹
                      {Number(selectedProduct.price || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <div className="border-t border-[#EEE8DE]" />

            {/* Design upload */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E4] text-sm font-black text-[#967019]">
                  03
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#38343A]">
                    Your design
                  </h3>
                  <p className="mt-1 text-xs text-[#8A8379]">
                    Optional · Attach a design or reference file.
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!designFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DCD2C1] bg-[#FCFAF6] px-5 py-8 text-center transition hover:border-[#D9AD32] hover:bg-[#F8F2E6] sm:py-10"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E5CA] text-xl font-black text-[#725514] transition group-hover:scale-105">
                    +
                  </span>
                  <span className="mt-4 text-sm font-extrabold text-[#38343A]">
                    Upload your design
                  </span>
                  <span className="mt-2 text-xs leading-5 text-[#77716B]">
                    Choose a JPG, PNG, WEBP, or PDF file
                  </span>
                  <span className="mt-1 text-[10px] font-semibold text-[#A49B8E]">
                    Maximum file size: 5 MB
                  </span>
                </button>
              ) : (
                <div className="flex flex-col gap-4 rounded-2xl border border-[#E5DED3] bg-[#FCFAF6] p-4 sm:flex-row sm:items-center">
                  {designFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(designFile)}
                      alt="Selected design preview"
                      className="h-24 w-full rounded-xl border border-[#E5DED3] bg-white object-contain sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-full items-center justify-center rounded-xl border border-[#E5DED3] bg-white text-xs font-black text-[#967019] sm:w-28">
                      PDF DOCUMENT
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-extrabold text-[#38343A]">
                      {designFile.name}
                    </p>
                    <p className="mt-1 text-xs text-[#77716B]">
                      {(designFile.size / 1024).toFixed(0)} KB · Ready to upload
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="mt-3 text-xs font-extrabold text-red-600 transition hover:text-red-800"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
              )}

              {fileError && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                  {fileError}
                </p>
              )}
            </section>

            <div className="border-t border-[#EEE8DE]" />

            {/* Project description */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E4] text-sm font-black text-[#967019]">
                  04
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#38343A]">
                    Tell us about your project
                  </h3>
                  <p className="mt-1 text-xs text-[#8A8379]">
                    Include your requirements and special instructions.
                  </p>
                </div>
              </div>

              <FormField label="Project details" required>
                <textarea
                  required
                  rows={5}
                  value={form.details}
                  onChange={(e) => change("details", e.target.value)}
                  className={`${ inputClass } resize - y`}
                  placeholder="Describe your design, printing requirements, quantity, preferred colors, finishing, and any special instructions..."
                />
              </FormField>
            </section>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            <div className="rounded-xl bg-[#F8F6F1] p-4">
              <p className="text-xs leading-6 text-[#77716B]">
                By submitting this form, you are sending your project
                requirements to Printora Studio for review. Final pricing and
                production details may depend on your specifications.
              </p>
            </div>

            <Button type="submit" className="w-full">
              Submit quote request
            </Button>

            <p className="text-center text-[11px] leading-5 text-[#8A8379]">
              Your request is stored in this browser demo. Uploaded files
              require suitable storage if you want them available across
              devices.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
