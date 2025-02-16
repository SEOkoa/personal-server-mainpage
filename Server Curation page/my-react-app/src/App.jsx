import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>한국대중음악상</h1>
        <nav>
          <ul>
            <li><a href="#about">소개</a></li>
            <li><a href="#nominees">후보</a></li>
            <li><a href="#winners">수상자</a></li>
            <li><a href="#contact">문의</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="about">
          <h2>소개</h2>
          <p>한국대중음악상은 ...</p>
        </section>
        <section id="nominees">
          <h2>후보</h2>
          <p>후보 목록 ...</p>
        </section>
        <section id="winners">
          <h2>수상자</h2>
          <p>수상자 목록 ...</p>
        </section>
      </main>
      <footer>
        <section id="contact">
          <h2>문의</h2>
          <p>연락처 정보 ...</p>
        </section>
      </footer>
    </div>
  )
}

export default App
