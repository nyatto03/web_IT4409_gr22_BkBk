import './rooms.css';
import SearchItem from '../searchItem/SearchItem';
import { getAllRoom } from '../../../apis';
import { useState, useEffect } from 'react';
import { Pagination, Input, Select, InputNumber } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        roomType: [],
        status: '',
        priceRange: [0, 10000000],
    });
    const roomTypes = [
        { value: 'single', label: 'Phòng đơn' },
        { value: 'double', label: 'Phòng đôi' },
    ];
    const statusOptions = [
        { value: 'Available', label: 'Còn trống' },
        { value: 'NotAvailable', label: 'Đã được đặt' },
    ];
    const fetchRooms = async () => {
        const res = await getAllRoom();
        return res;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRooms();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchData();
    }, [rooms]);

    // Filter rooms based on search term
    // const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =
            filters.roomType.length === 0 || filters.roomType.some((type) => room.room_type.includes(type));
        const matchesStatus =
            !filters.status ||
            (filters.status === 'Available' ? room.status === 'Available' : room.status !== 'Available');
        const matchesPrice = room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1];
        return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="listContainer">
            <div className="listWrapper">
                <div className="filter-and-search">
                    <div className="searchBar">
                        <Input
                            placeholder="Tìm kiếm theo tên phòng..."
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="listSearch">
                        <h1 className="lsTitle">
                            <FilterOutlined /> Bộ lọc tìm kiếm
                        </h1>
                        <div className="lsItem">
                            <label>Loại phòng</label>
                            <Select
                                mode="multiple"
                                placeholder="Chọn loại phòng"
                                onChange={(values) => setFilters({ ...filters, roomType: values })}
                                options={roomTypes}
                                className="filter-select"
                            />
                        </div>
                        <div className="lsItem">
                            <label>Khoảng giá (VNĐ)</label>
                            <div className="price-range-inputs">
                                <InputNumber
                                    placeholder="Giá thấp nhất"
                                    min={0}
                                    max={10000000}
                                    step={100000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            priceRange: [value || 0, filters.priceRange[1]],
                                        })
                                    }
                                    className="price-input"
                                />
                                <span className="price-separator">-</span>
                                <InputNumber
                                    placeholder="Giá cao nhất"
                                    min={0}
                                    max={10000000}
                                    step={100000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            priceRange: [filters.priceRange[0], value || 10000000],
                                        })
                                    }
                                    className="price-input"
                                />
                            </div>
                        </div>
                        <div className="lsItem">
                            <label>Trạng thái</label>
                            <Select
                                placeholder="Chọn trạng thái"
                                onChange={(value) => setFilters({ ...filters, status: value })}
                                options={statusOptions}
                                className="filter-select"
                                allowClear
                            />
                        </div>
                    </div>
                </div>

                <div className="listResult">
                    {currentItems.map((room, index) => (
                        <SearchItem key={index} room={room} />
                    ))}
                    <Pagination
                        current={currentPage}
                        total={filteredRooms.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Rooms;
