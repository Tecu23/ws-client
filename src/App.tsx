import Game from "./components/Game";

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100 flex flex-col justify-start gap-10">
            <div className="">Hello World</div>

            <div className="h-[400px] w-[400px] self-center">
                <Game />
            </div>
        </main>
    );
}

export default App;
