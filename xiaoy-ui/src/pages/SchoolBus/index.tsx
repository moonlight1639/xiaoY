import "./SchoolBus.css";

function SchoolBus() {
  return (
    <div className="schoolbus-page">
      <header className="schoolbus-hero">
        <p className="hero-subtitle">中国科大2025年秋季学期</p>
        <h1 className="hero-title">校车时刻表</h1>
      </header>
      <div className="schoolbus-table-container">
        <table>
          <tr>
            <th className="field-name-cell">高新校区</th>
            <th className="field-name-cell">先研院</th>
            <th className="field-name-cell">西区</th>
            <th>东区</th>
          </tr>
          <tr>
            <td>6:40</td>
            <td>8:05</td>
            <td rowSpan={8}>
              <p>🚌</p>
              <p>🚌</p>
              <p>🚌</p>
            </td>
            <td>7:25</td>
          </tr>
          <tr>
            <td>8:00</td>
            <td>8:05</td>
            {/* <td>西区</td> */}
            <td>8:50</td>
          </tr>
          <tr>
            <td>9:35</td>
            <td>9:40</td>
            {/* <td>西区</td> */}
            <td>10:20</td>
          </tr>
          <tr>
            <td>12:50</td>
            <td>12:55</td>
            {/* <td>西区</td> */}
            <td>13:35</td>
          </tr>
          <tr>
            <td>14:30</td>
            <td>14:35</td>
            {/* <td>西区</td> */}
            <td>15:25</td>
          </tr>
          <tr>
            <td>16:00</td>
            <td>16:05</td>
            {/* <td>西区</td> */}
            <td>16:50</td>
          </tr>
          <tr>
            <td>18:30</td>
            <td>18:35</td>
            {/* <td>西区</td> */}
            <td>19:25</td>
          </tr>
          <tr>
            <td>22:05</td>
            <td>22:10</td>
            {/* <td>西区</td> */}
            <td>22:50</td>
          </tr>
        </table>

        <table>
          <tr>
            <th className="field-name-cell">东区</th>
            <th className="field-name-cell">西区</th>
            <th className="field-name-cell">先研院</th>
            <th>高新校区</th>
          </tr>
          <tr>
            <td>6:50</td>
            <td>7:00</td>
            <td rowSpan={8}>
              <p>🚌</p>
              <p>🚌</p>
              <p>🚌</p>
            </td>
            <td>7:40</td>
          </tr>
          <tr>
            <td>8:00</td>
            <td>8:10</td>
            {/* <td>西区</td> */}
            <td>9:00</td>
          </tr>
          <tr>
            <td>12:50</td>
            <td>13:00</td>
            {/* <td>西区</td> */}
            <td>13:40</td>
          </tr>
          <tr>
            <td>14:30</td>
            <td>14:40</td>
            {/* <td>西区</td> */}
            <td>15:25</td>
          </tr>
          <tr>
            <td>16:00</td>
            <td>16:10</td>
            {/* <td>西区</td> */}
            <td>16:50</td>
          </tr>
          <tr>
            <td>18:30</td>
            <td>18:40</td>
            {/* <td>西区</td> */}
            <td>19:30</td>
          </tr>
          <tr>
            <td>21:20</td>
            <td>21:30</td>
            {/* <td>西区</td> */}
            <td>22:00</td>
          </tr>
          <tr>
            <td>22:05</td>
            <td>22:15</td>
            {/* <td>西区</td> */}
            <td>23:00</td>
          </tr>
        </table>
      </div>

      <div className="schoolbus-table-container">
        <table>
          <tr>
            <th className="field-name-cell">高新校区</th>
            <th className="field-name-cell">先研院</th>
            <th className="field-name-cell">西区</th>
            <th>东区</th>
          </tr>
          <tr>
            <td>8:00</td>
            <td>8:05</td>
            <td rowSpan={4}>
              <p>🚌</p>
              <p>🚌</p>
              <p>🚌</p>
            </td>
            <td>8:50</td>
          </tr>
          <tr>
            <td>13:40</td>
            <td>13:45</td>
            {/* <td>西区</td> */}
            <td>14:30</td>
          </tr>
          <tr>
            <td>16:00</td>
            <td>16:05</td>
            {/* <td>西区</td> */}
            <td>16:50</td>
          </tr>
          <tr>
            <td>21:50</td>
            <td>21:55</td>
            {/* <td>西区</td> */}
            <td>22:40</td>
          </tr>
        </table>
        <table>
          <tr>
            <th className="field-name-cell">东区</th>
            <th className="field-name-cell">西区</th>
            <th className="field-name-cell">先研院</th>
            <th>高新校区</th>
          </tr>
          <tr>
            <td>7:00</td>
            <td>7:10</td>
            <td rowSpan={4}>
              <p>🚌</p>
              <p>🚌</p>
              <p>🚌</p>
            </td>
            <td>7:50</td>
          </tr>
          <tr>
            <td>12:50</td>
            <td>13:00</td>
            {/* <td>西区</td> */}
            <td>13:40</td>
          </tr>
          <tr>
            <td>18:30</td>
            <td>18:40</td>
            {/* <td>西区</td> */}
            <td>19:30</td>
          </tr>
          <tr>
            <td>21:50</td>
            <td>22:00</td>
            {/* <td>西区</td> */}
            <td>22:50</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default SchoolBus;
