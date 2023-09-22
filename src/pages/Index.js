import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  currentPageAction,
  fetchData,
  filterResult,
  resetData,
  searchKeys,
} from "../redux/Action";
import ReactPaginate from "react-paginate";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import SearchSection from "../components/SearchSection";

const Homepage = () => {
  const dispatch = useDispatch();
  const { data, filterlist, currentPageNo, searchItem } = useSelector(
    (state) => state?.dataReducer
  );
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filterData, setFilterData] = useState(filterlist ? filterlist : data);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchData());
    const persistedCurrentPageNo = currentPageNo;
    if (persistedCurrentPageNo !== null) {
      setCurrentPage(persistedCurrentPageNo);
    }
  }, [filterlist]);

  useEffect(() => {
    if(filterlist?.length === 0){
      setFilterData(data)
    }
  }, []);

  useEffect(() => {
    if (searchItem) {
      const { searchTitle, searchStatus } = searchItem;
      setSearchStatus(searchStatus);
      setSearchTitle(searchTitle);
    }
  }, [filterlist]);

  const handleFilter = () => {
    let object = { searchTitle, searchStatus };
    dispatch(searchKeys(object));
    const filteredData = data?.filter((item) => {
      const titleMatch =
        !searchTitle ||
        item.title.toLowerCase().includes(searchTitle.toLowerCase());

      const statusMatch =
        !searchStatus ||
        (searchStatus?.toLowerCase() === "active" && item.completed) ||
        (searchStatus?.toLowerCase() === "inactive" && !item.completed);

      return titleMatch && statusMatch;
    });
    dispatch(filterResult(filteredData));
    setFilterData(filteredData);
    setCurrentPage(0);
  };
  
  const handleReset = () => {
    setSearchTitle("");
    setSearchStatus("");
    setFilterData(data);
    setCurrentPage(0);
    dispatch(resetData());
    dispatch(fetchData());
  };

  const paginateData = (data, page, itemsPerPage) => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data?.slice(startIndex, endIndex);
    return slicedData;
  };

  const handleSort = (order) => {
    const sortedData = [...(filterData?.length > 0 ? filterData : data)].sort(
      (a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        switch (order) {
          case "asc":
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          case "desc":
            if (titleA > titleB) {
              return -1;
            }
            if (titleA < titleB) {
              return 1;
            }
            return 0;
          default:
            return 0;
        }
      }
    );
    setFilterData(sortedData);
    dispatch(filterResult(sortedData));
    setCurrentPage(0);
  };

  const hendleCurrentPage = (selected) => {
    setCurrentPage(selected);
    dispatch(currentPageAction(selected));
  };

  return (
    <>
      <div className="Home_page">
        <h1>App</h1>
        <Container>
          <SearchSection
            handleReset={handleReset}
            handleFilter={handleFilter}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
          />
          <div className="data_table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserId</th>
                  <th>
                    Title{" "}
                    <div className="sort">
                      <span onClick={() => handleSort("asc")}>
                        <IoMdArrowDropup />
                      </span>
                      <span>
                        <IoMdArrowDropdown onClick={() => handleSort("desc")} />
                      </span>
                    </div>{" "}
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filterData?.length > 0 ? (
                  <>
                    {paginateData(filterData, currentPage, itemsPerPage)?.map(
                      (item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.userId}</td>
                            <td>{item.title}</td>
                            <td
                              className={
                                item.completed ? "active" : "in-active"
                              }
                            >
                              {item.completed ? "Active" : "InActive"}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan={4}
                        style={{ textAlign: "center", color: "tomato" }}
                      >
                        Record Not Found
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </div>
          <div className="paginations">
            {filterData?.length > 0 ? (
              <>
                <ReactPaginate
                  pageCount={Math.ceil(
                    (filterData?.length > 0 ? filterData : data)?.length /
                      itemsPerPage
                  )}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={1}
                  onPageChange={({ selected }) => hendleCurrentPage(selected)}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  forcePage={currentPageNo}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
