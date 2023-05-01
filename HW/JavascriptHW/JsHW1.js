
// Q1.
// Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223
function revNum(num) {
    return num.toString().split("").reverse().join("");
}
// console.log(revNum(12345));

// Q2.
// Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.
function checkPalin(str) {
    let tmp = str.trim().toLowerCase();
    for (let i = 0; i < tmp.length / 2; i++) {
        if (tmp.charAt(i) != tmp.charAt(tmp.length - i - 1)) {
            return false;
        }
    }
    return true;
}
//console.log(checkPalin("aCCCa"));

// Q3
// Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g
// 1. 首先是单字，其次是双字组合，三字...一直到leng-1字组合，和最后的leng组
// 2. 两个循环，外循环是控制字数的循环遍历；内循环是当前字数下的循环遍历
// 3. 创建一个arr用来检测组合是否已存在
function combination(str) {
    let arr = []
    for (let i = 1; i <= str.length; i++) {
        for (let j = 0; j + i <= str.length; j++) {
            let tmpStr = str.substr(j, i);
            if (!arr.includes(tmpStr)) {
                arr.push(tmpStr);
            }
        }
    }
    return arr;
}
//console.log(combination("dogg"));

// Q4
// Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function alphaSort(str) {
    return str.split("").sort().join("");
}
// console.log(alphaSort("dbca"));

// Q5
// Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function firstLetterUpper(str) {
    let arr = str.split(" ");
    return arr.map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(" ");
}

function capitalizeWords(str) {
    var capitalizedStr = str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });

    return capitalizedStr;
}

// console.log(capitalizeWords("the quick brown fox"));

// Q6
// Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function findLong(str) {
    let arr = str.split(" ");
    return arr.reduce(
        (longest, value) => longest.length < value.length ? value : longest
    );
}
// console.log(findLong('Web love Tutorial'));

// Q7
// Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function countVowel(str) {
    let pattern = /[aeiou]/gi
    return str.match(pattern) ? str.match(pattern).length : 0;
};
// console.log(countVowel("bc"));

// Q8
// Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
// 1判断：1.小于2的false；2. 从2开始作为除数，遍历到 sqrt(num）,如果num能被整除，false；3. 除此之外，true
function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
// console.log(isPrime(6));

// Q9
// Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.
function getType(param) {
    const type = typeof param;
    if (type === "object") {
        if (param === null) {
            return "null";
        } else if (Array.isArray(param)) {
            return "array"
        } else {
            return "object";
        }
    } else {
        return type;
    }
}
// console.log(getType(null));

// Q10
//Write a JavaScript function which returns the n rows by n columns identity matrix. 
// [[1,0,0],
// [0,1,0],
// [0,0,1]]   n=3
function getMatrix(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == j) {
                matrix[i][j] = 1;
            } else {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}
// console.log(getMatrix(5));

// Q11
// Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4
function secNumber(numArr) {
    let arr = [];
    numArr.sort();
    arr.push(numArr[1], numArr[numArr.length - 2]);
    return arr;
}
// let a = [9, 2, 7, 4, 8, 0, -1];
// console.log(secNumber(a));

// Q12
// Write a JavaScript function which says whether a number is perfect. 
// 完全数：它的所有正因子（不包括自己）加起来等于自己，6: 1 + 2 + 3;
function isPerfect(number) {
    let div = [];
    for (let i = 1; i < number; i++) {
        if (number % i == 0) {
            div.push(i);
        }
    }
    return number == div.reduce((res, val) => res + val) ? true : false;
}
// console.log(isPerfect(8128));

// Q13
// Write a JavaScript function to compute the factors of a positive integer. 
function factor(num) {
    let factors = [];

    if (num <= 0 || !Number.isInteger(num)) {
        throw console.error("not a positive integer");
    }

    for (let i = 0; i <= num; i++) {
        if (num % i == 0) {
            factors.push(i);
        }
    }
    return factors;
}
// console.log(factor(9));

// Q14
// Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
// 思路：
// 降序排列coins，amount比coin大就减去coin，同时push一次coin到changes，amount比coin小就下一个coin，直到不存在coin
function amountTocoins(amount, coins = []) {
    let changes = [];
    let tmp = amount; //
    if (!coins.length || !coins.includes(1)) {
        throw new Error("Coins error, check coins");
    }
    coins.sort((a, b) => b - a);
    for (let i = 0; i < coins.length; i++) {
        while (tmp >= coins[i]) {
            tmp -= coins[i];
            changes.push(coins[i]);
        }
    }
    return changes;
}
// console.log(amountTocoins(25, [25, 10, 5, 2, 1]));

// Q15
// Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result. 
function exponent(b, n) {
    return Math.pow(b, n);
}
// let b = +prompt("Type in the base number");
// let n = +prompt("Type in the exponent");
// alert(exponent(b, n))

// Q16
// Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function extractUnique(str) {
    let unique = new Set(str.split(""));
    return Array.from(unique).join("");
}
// console.log(extractUnique("aabbcc"));

// Q17
// Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function occurrences(str) {
    let obj = {}
    for (let i = 0; i < str.length; i++) {
        obj[str.charAt(i)] = (obj[str.charAt(i)] || 0) + 1;
    }
    return obj;
}
// console.log(occurrences("aabbcc"));

// Q18
// Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.
// 思路
// 1. binary只能进行有序查找，要先排序，并记录数值的原始index，可以用object储存，将其存进数组
// 2. 排序好数组边界left right，计算出middle，与value进行比较，然后缩小范围，直至找到（或return-1）
function binarySearch(arr, value) {
    let indexArr = arr.map((value, index) => ({ value, index }))//将数据和index组成obj，放入数组
    indexArr.sort((a, b) => a.value - b.value);

    let left = 0;
    let right = indexArr.length;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (indexArr[mid].value === value) {
            return indexArr[mid].index;
        }

        if (value > indexArr[mid].value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
// let arr = [3, 1, 2, 9, 4, 7];
// console.log(binarySearch(arr, 9));

// Q19
// Write a JavaScript function that returns array elements larger than a number. 
function biggerThan(arr, val) {
    return arr.filter(value => value > val);
}
// let arr = [1, 2, 3, 4, 5];
// console.log(biggerThan(arr, 0));

// Q20
// Write a JavaScript function that generates a string id (specified length) of random characters. 
// Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function generatorRandomID(length) {
    let sampleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    while (length--) {
        id += sampleChars.charAt(Math.floor(Math.random() * sampleChars.length));
    }
    return id;
}
// console.log(generatorRandomID(5));

// Q21
// Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
// 思路：
// base case：length是1，返回当前array里每个值组成的单元素数组的数组，例如[[1],[2],[3]]
// 如果length>1，生成一个res数组，用来保存 子数组（array.slice(1),length-1）调用本函数的返回结果
// 
function fixedLengthSubset(arr, length) {
    if (length === 1) {
        return arr.map(value => [value]);
    }

    let res = [];
    for (let i = 0; i < arr.length - length + 1; i++) {
        let subset = fixedLengthSubset(arr.slice(i + 1), length - 1);
        let pushedSet = subset.map(value => [arr[i], ...value])
        res.push(...pushedSet);
    }
    return res;
}
// let a = [1, 2, 3, 4]
// console.log(fixedLengthSubset(a, 2));


// Q22
// Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o' 
// Expected output: 3 
function letOccur(str, letter) {
    let pattern = new RegExp(letter, "gi");
    let matches = str.match(pattern);
    return matches ? matches.length : 0;
}
// let str = "abcdedd";
// console.log(letOccur(str, 'd'));

// Q23
// Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function firstNoRepeatedChar(str) {
    let charCount = {};

    for (const char of str) {
        if (charCount[char]) {
            charCount[char] += 1;
        } else {
            charCount[char] = 1;
        }
    }

    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    return null;
}
// let a = 'abacddbec'
// console.log(firstNoRepeatedChar(a));


// Q24
// Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                let tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}
// let a = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
// bubbleSort(a)
// console.log(a);

// Q25
// Write a JavaScript function that accept a list of country names as input and returns the longest country name as output. 
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
function longestName(list) {
    let longest = "";
    list.forEach(value => {
        if (longest.length < value.length) {
            longest = value;
        }
    });
    return longest
}
// let a = ["Australia", "Germany", "asbquhsqweqweqweqwoiqwqweqweqw", "United States of America"];
// console.log(longestName(a));

// Q26
// Write a JavaScript function to find longest substring in a given a string without repeating characters. 
// 思路
// longest记录最长，cur记录当前遍历到的最长
// 遍历str，如果当前char未出现在cur里，则cur+char
// 否则，对比cur和longest的长度，更新longest
// 然后更新cur，slice(index+1) + char
function longestSubstr(str) {
    let longest = "";
    let cur = "";
    for (const char of str) {
        let index = cur.indexOf(char);
        if (index === -1) {
            cur = cur + char;
        } else {
            if (cur.length > longest.length) {
                longest = cur;
            }//更新longest
            cur = cur.slice(index + 1) + char; //更新cur
        }
    }
    if (cur.length > longest.length) { //最后更新longest
        longest = cur;
    }

    return longest;
}
// console.log(longestSubstr("abcad"));

// Q27 
// Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest symmetric factor problem is the problem of finding a maximum-length contiguous substring of a given string that is also a palindrome. For example, the longest palindromic substring of "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for example, in the string "abracadabra", there is no palindromic substring with length greater than three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all substrings that are themselves palindromes and cannot be extended to larger palindromic substrings) rather than returning only one substring or returning the maximum length of a palindromic substring.
function longestPalindromicSubstring(str) {
    let longestPal = "";

    function isPalindrome(str) {
        return str === str.split("").reverse().join("");
    }

    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let substr = str.slice(i, j);

            if (isPalindrome(substr) && substr.length > longestPal.length) {
                longestPal = substr;
            }
        }
    }
    return longestPal;
}
// let a = "bananas"
// console.log(longestPalindromicSubstring(a));

// Q28
// Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function callback(func) {
    func();
}


// Q29
// Write a JavaScript function to get the function name. 
function getFunctionName(func) {
    return func.name;
}
// console.log(getFunctionName(callback));





