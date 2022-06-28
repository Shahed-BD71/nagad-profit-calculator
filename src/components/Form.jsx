import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Hero from "./Hero";

export default function ProfitForm() {
  const [amount, setAmount] = useState(0);
  const TaxAID = (amount * 0.010).toFixed(2);
  const profitMonthly = ((amount - TaxAID) / 12).toFixed(2);
  const ProfitQuarterly = (profitMonthly * 3).toFixed(2);
  const profitYearly = (profitMonthly * 12).toFixed(2);

  const {
    register,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    const subscription = watch(({ amount, profit }, data) => {
      function between(x, min, max) {
        return x >= min && x <= max;
      }
      if (between(amount, 1, 999)) {
        setAmount(0 * amount);
      }
      if (between(amount, 1000, 5000)) {
        setAmount(0.015 * amount);
      }
      if (between(amount, 5000.01, 15000)) {
        setAmount(0.02 * amount);
      }
      if (between(amount, 15000.01, 150000)) {
        setAmount(0.03 * amount);
      }
      if (between(amount, 150000.01, 300000)) {
        setAmount(0.075 * amount);
      }
      if (parseInt(amount) >= 300000.01) {
        alert("Please Enter a valid amount");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <section>
      <div className="bg-gray-300">
        <div className="py-28">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="flex flex-row p-6 md:p-12">
              <h2 className="text-3xl font-semibold">Profit</h2>
              <h2 className="text-3xl font-semibold text-green-400">Calculator</h2>
            </div>
            <div className="md:flex max-w-screen-xl">
              <Hero />
              <div className="w-full p-4 md:px-16 px-8 py-8">
                <form>
                  <div className="grid md:grid-cols-2 md:gap-2">
                    <div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        {...register("amount", {
                          required: true,
                          min: 1000,
                          max: 300000,
                        })}
                        className="input-field"
                        placeholder="Enter Amount*"
                      />
                      {errors.amount && (
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <select
                        className="input-field"
                        name="parcelType"
                        id="parcelType"
                        {...register("parcelType", {
                          required: true,
                        })}
                      >
                        <option defaultChecked disabled>
                          Received Month
                        </option>
                        <option value={""}>January</option>
                        <option value={""}>April</option>
                        <option value={""}>July</option>
                        <option value={""}>October</option>
                      </select>
                      {errors.parcelType && (
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-5 space-y-2 text-right">
                    <p className="font-medium text-md text-red-700">
                      Total Profit(Yearly): {amount.toFixed(2)} Tk
                    </p>
                    <p className="font-medium text-md text-red-700">Tax(AID): {TaxAID}Tk</p>
                    <hr />
                    <p className="text-lg font-semibold text-green-700">
                      Profit Amount Monthly: {profitMonthly} Tk
                    </p>
                    <p className="text-lg font-semibold text-purple-700">
                      Profit Amount Quarterly: {ProfitQuarterly} Tk
                    </p>
                    <p className="text-lg font-semibold text-blue-700">
                      Profit Amount Yearly: {profitYearly} Tk
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
