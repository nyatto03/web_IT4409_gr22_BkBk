import './rooms.css';
import SearchItem from '../searchItem/SearchItem';
const Rooms = () => {
    return (
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className="lsTitle">Lọc nhanh</h1>
                    <div className="lsItem">
                        <label>Loại phòng</label>
                        <input type="text" />
                    </div>
                    <div className="lsItem">
                        <label>Giá</label>
                        <input type="text" />
                    </div>
                    <div className="lsItem">
                        <label>Trạng thái</label>
                        <input type="text" />
                    </div>
                    <button>Lọc</button>
                </div>
                <div className="listResult">
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>
            </div>
        </div>
    );
};

export default Rooms;
