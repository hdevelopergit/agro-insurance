//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Insurance is Ownable {
    mapping(address => string) public insuredList;
    mapping(string => uint256) public campaignRain;
    uint256 public currentDate; // Only for testing purposes
    //    address public insuranceOwner;

    struct period {
        uint256 from;
        uint256 to;
    }
    mapping(string => period) public locationPeriod;

    constructor(address initialOwner) {
        //insuranceOwner = initialOwner;
    }

    receive() external payable {}

    function collectInsurance() public {
        uint256 currentDateTmp;
        uint256 dayDiff;
        string memory regionInsured = insuredList[msg.sender];

        require(
            keccak256(abi.encodePacked(regionInsured)) !=
                keccak256(abi.encodePacked("")),
            "You are not insured!"
        );

        if (currentDate == 0) currentDateTmp = block.timestamp;
        else currentDateTmp = currentDate;

        if (currentDateTmp > locationPeriod[regionInsured].to)
            dayDiff = uint256(
                (currentDateTmp - locationPeriod[insuredList[msg.sender]].to) /
                    60 /
                    60 /
                    24
            );
        require(
            dayDiff > 5,
            "You can collect the insurance only after 5 days campaign ends"
        );

        uint256 rain = campaignRain[regionInsured];
        require(
            rain < 500 || rain > 800,
            "The mm rained are between the normal parameters. You can't collect the insurance"
        );
        (bool sent, bytes memory data) = msg.sender.call{value: 0.1 ether}("");
        require(sent, "Failed to send Ether");

        // if all is OK. take out from insured list to avoid collect more than once
        insuredList[msg.sender] = "";
    }

    function getCurrentDate() public view returns (uint256) {
        if (currentDate == 0) return block.timestamp;
        else return currentDate;
    }

    // only for testing purposes
    function setCurrentDate(uint256 _inputDate) public {
        currentDate = _inputDate;
    }

    function setLocationPeriod(
        string memory _location,
        uint256 _from,
        uint256 _to
    ) public onlyOwner {
        //require(msg.sender == address(this), "You are not the owner!");
        locationPeriod[_location].from = _from;
        locationPeriod[_location].to = _to;
    }

    function payInsuranceFee(string memory _location) public payable {
        uint256 currentDateTmp;

        if (currentDate == 0) currentDateTmp = block.timestamp;
        else currentDateTmp = currentDate;

        require(
            keccak256(abi.encodePacked(insuredList[msg.sender])) ==
                keccak256(abi.encodePacked("")),
            "You paid your fee already. Only is allowed 1 location per adddress"
        );
        require(
            currentDateTmp < locationPeriod[_location].from,
            "You are late to get insured!"
        );
        uint256 dayDiff = uint256(
            (locationPeriod[_location].from - currentDateTmp) / 60 / 60 / 24
        );
        require(
            dayDiff <= 30,
            "You can get insured till 30 days before the campaign starts"
        );
        insuredList[msg.sender] = _location;
    }

    function enterMm(string memory _location, uint256 _rain) public onlyOwner {
        campaignRain[_location] = _rain;
    }

    function getMm(string memory _location) public view returns (uint256) {
        return campaignRain[_location];
    }
}
