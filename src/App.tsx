import Board from "../components/Board";

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100 flex flex-col justify-start gap-10">
            <div className="bg-red-100 h-40">Hello World</div>

            <div className="h-[400px] w-[400px] self-center">
                <Board name="board" />
            </div>
        </main>
    );
}

export default App;
