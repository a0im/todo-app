import { useState, useCallback, useRef ,useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { HiCheck } from "react-icons/hi";


function Header({ onInsert ,weekArr }) {
  const [valueX, setValue] = useState({text: "", week: "choice" });
  const {eng,kor} = weekArr
  const selectRef = useRef()
  const navigate = useNavigate()


  useEffect(() => {
    setValue({...valueX
    ,week : selectRef.current.value
    })
  },[]);
  // if (e.target.name == 'week') navigate(`/week/${valueX.week}`)
// .options[langSelect.selectedIndex].value
  const onChange = useCallback(
    e => {
      const { value, name } = e.target;
      if (e.target.name == 'week') navigate(`/week/${e.target.value}`)
      setValue({ ...valueX, [name]: value });
      console.log(name, valueX.week);
      e.preventDefault();
    },
    [valueX]
  );
  // navigate(`/week/${valueX.week}`)


  const onSumbit = useCallback(
    e => {
      if (!valueX.text.trim()  || valueX.week == 'choice') return;
      onInsert(valueX)
      navigate(`/week/${valueX.week}`)
      setValue({
        text: "",
        week: selectRef.current.value,
      });
      e.preventDefault(); 
    },
    [onInsert, valueX]
  );

  function resetSelect() {
    setValue({ ...valueX , week: 'choice'}) 
  }
  
  return (
    <header className="px-[30px] pt-[30px]">
      <h1 className="mb-[20px]">
        <Link to={"/"} onClick={resetSelect} className="text-[48px]   font-bold bg-yellow-300">
            TODOLIST
        </Link>
      </h1>
      <form onSubmit={onSumbit} onChange={onChange} className="flex h-[50px] text-[22px]" >
        <input name="text" placeholder="일정을 적어주세요." onChange={onChange} value={valueX.text || ""} 
          className="inline-block w-[100%] pl-10px" />
        <select ref={selectRef} name="week"  onChange={onChange} className="text-gray-400" value={valueX.week}>
        <option value="choice">요일선택</option>
        {
          eng.map(( day , i) =>(<option key={i} value={day}>{kor[i]}</option>))
        }
        </select>
        <button type="submit" className="block text-[35px] w-[70px] bg-yellow-300">
          <HiCheck className="mx-auto" />
          <Link to={`/week/${valueX.week}`}></Link>
        </button>
      </form>
    </header>
  );
}

export default Header;
