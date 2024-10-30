import Game from "./components/Game";

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-200 flex flex-col justify-start gap-10">
            <div className="">Hello World</div>

            <div className="self-center">
                <Game />
            </div>
        </main>
    );
}

export default App;
