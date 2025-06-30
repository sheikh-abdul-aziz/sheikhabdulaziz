import React from "react";

export default function About() {
    return (
        <> {/* Root */}
            {/* Header */}
            <main className="{styles.main flex flex-col bg-background gap-4 items-center}"> {/* Main */}
                <section className="flex flex-col gap-4 items-center"> {/* Hero */}
                </section>
                <section className="flex flex-col gap-4 items-center"> {/* Showcase */}
                </section>
                <section className="flex flex-col gap-4 items-center"> {/* Features */}
                </section>
                <section className="flex flex-col gap-4 items-center"> {/* Testimonials */}
                </section>
                <section className="flex flex-col gap-4 items-center"> {/* CTA */}
                </section>
                <section className="flex flex-col gap-4 items-center"> {/* Accordion */}
                </section>
            </main>
            {/* Footer */}
        </>
    );
}