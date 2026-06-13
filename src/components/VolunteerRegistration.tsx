"use client";

import { RefreshCw, UserPlus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Volunteer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  skills: string[];
  availability: string;
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

export function VolunteerRegistration() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function loadVolunteers() {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/volunteer", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Unable to load volunteers");
      }

      const data = await response.json();
      setVolunteers(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function loadInitialVolunteers() {
      try {
        const response = await fetch("/api/volunteer", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load volunteers");
        }

        const data = await response.json();

        if (isActive) {
          setVolunteers(data);
        }
      } catch (error) {
        if (isActive) {
          setMessage(
            error instanceof Error ? error.message : "Something went wrong"
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadInitialVolunteers();

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      age: Number(formData.get("age")),
      city: formData.get("city"),
      skills: formData.get("skills"),
      availability: formData.get("availability"),
    };

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      form.reset();
      setMessage("Volunteer registered successfully.");
      await loadVolunteers();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 justify-center bg-zinc-50 px-4 py-10">
      <section className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Volunteer Registration
          </p>
          <h1 className="mt-3 text-4xl font-bold text-zinc-950 sm:text-5xl">
            Join the volunteer team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Register volunteers and review the newest submissions in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <form
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-zinc-800">
                  Full Name
                </span>
                <input
                  className={inputClass}
                  name="name"
                  placeholder="Full Name"
                  required
                  type="text"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-800">Email</span>
                <input
                  className={inputClass}
                  name="email"
                  placeholder="Email"
                  required
                  type="email"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-800">
                  Phone Number
                </span>
                <input
                  className={inputClass}
                  name="phone"
                  placeholder="Phone Number"
                  required
                  type="tel"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-800">Age</span>
                <input
                  className={inputClass}
                  min="1"
                  name="age"
                  placeholder="Age"
                  required
                  type="number"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-800">City</span>
                <input
                  className={inputClass}
                  name="city"
                  placeholder="City"
                  required
                  type="text"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-zinc-800">
                  Skills
                </span>
                <input
                  className={inputClass}
                  name="skills"
                  placeholder="Teaching, first aid, event support"
                  required
                  type="text"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-zinc-800">
                  Availability
                </span>
                <select
                  className={inputClass}
                  defaultValue=""
                  name="availability"
                  required
                >
                  <option disabled value="">
                    Select availability
                  </option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </label>
            </div>

            {message ? (
              <p className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                {message}
              </p>
            ) : null}

            <button
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-400"
              disabled={isSubmitting}
              type="submit"
            >
              <UserPlus size={18} />
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <aside className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">
                  Volunteers
                </h2>
                <p className="text-sm text-zinc-500">
                  {volunteers.length} registered
                </p>
              </div>
              <button
                aria-label="Refresh volunteers"
                className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                onClick={loadVolunteers}
                type="button"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <p className="rounded-lg bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-500">
                  Loading volunteers...
                </p>
              ) : volunteers.length === 0 ? (
                <p className="rounded-lg bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-500">
                  No volunteers registered yet.
                </p>
              ) : (
                volunteers.map((volunteer) => (
                  <article
                    className="rounded-lg border border-zinc-200 p-4"
                    key={volunteer._id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-zinc-950">
                          {volunteer.name}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          {volunteer.city} | Age {volunteer.age}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {volunteer.availability}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-zinc-600">
                      <p>{volunteer.email}</p>
                      <p>{volunteer.phone}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {volunteer.skills.map((skill) => (
                        <span
                          className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
