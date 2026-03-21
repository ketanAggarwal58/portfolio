
export const metadata = {
    title: "Ketan Aggarwal",
    description: "A software engineer and curious learner on a journey of constant reinvention. I write to share my thoughts, experiments, and lessons from both work and life—hoping to spark ideas that last beyond the moment.",
};

export default function PostLayout({ children }){
    return (
        <>
            <main>{children}</main>
        </>
    );
}