const LandingPageLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return (
        <div className="h-full bg-blend-darken ">
            <main className="pt-40 pb-20 bg-slate-700">
            {children}
            </main>
        </div>
    )
}

export default LandingPageLayout