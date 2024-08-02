/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OUEIvcDiZih
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


import { useState , useEffect ,  } from "react"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios from "axios"


export default function Component() {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const [groupName, setGroupName] = useState("")
  const [groups, setGroups] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
 


  // useEffect(() => {
  //   // Fetch groups from the database on component mount
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/auth/groups');
  //       console.log('Fetched groups:', response.data); 
  //       setGroups(response.data);
  //     } catch (error) {
  //       console.error("Error fetching groups:", error);
  //     }
  //   };
  //   fetchGroups();
  // }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/groups");
        if (response.status === 200) {
          setGroups(response.data);
        } else {
          console.error("Failed to fetch groups:", response);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handlePopupOpen = () => {
    setIsPopupOpen(true)
  }
  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }
  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value)
  }
  // const handleCreateGroup = () => {
  //   if (groupName.trim() !== "") {
  //     const newGroup = {
  //       name: groupName,
  //       color: selectedColor,
  //     }
  //     setGroups([...groups, newGroup])
  //     setGroupName("")
  //     setSelectedColor("")
  //     handlePopupClose()
  //   }
  // }

  const handleCreateGroup = async () => {
    if (groupName.trim() !== "") {
      const newGroup = {
        name: groupName,
        color: selectedColor,
      };
      
      try {
        // Make API call to store the new group in the database
        const response = await axios.post('http://localhost:5000/api/auth/groups', newGroup);
        console.log (response);
        if (response.status === 201) {
          // Successfully created group, update the local state
          setGroups([...groups, response.data]);
          setGroupName("");
          setSelectedColor("");
          handlePopupClose();
        } else {
          // Handle the error appropriately
          console.error("Failed to create group:", response);
        }
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0];
    return initials.toUpperCase();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

 
  return (
    <div className="flex h-screen w-full">
      <aside
        className={`fixed inset-y-0 left-0 z-10 flex h-screen w-64 flex-col border-r bg-background md:static md:h-auto ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="flex h-14 items-center justify-center border-b px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            
            <span>Pocket Notes</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={toggleSidebar}>
            <XIcon className="h-4 h-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <nav className="grid gap-2">
            {groups.map((group, index) => (
              <Link
                to="/create-notes" 
                key={index}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-${group.color}-500 text-white p-6`}
                >
                  {/* {group.name.slice(0, 2).toUpperCase()} */}
                  {getInitials(group.name)}
                </div>
                <span className="text-black font-semibold">{group.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="sticky bottom-4 right-4 flex justify-end px-4 py-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-blue-900 text-primary-foreground"
              onClick={handlePopupOpen}
            >
              <PlusIcon className="h-6 w-6 font-bold" />
              <span className="sr-only">Add new group</span>
            </Button>
          </div>
        </div>
      </aside>
      <div className="flex-1 relative">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary text-primary-foreground absolute top-4 left-4 md:hidden"
          onClick={toggleSidebar}
        >
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        {isPopupOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50" onClick={handlePopupClose}>
            <div
              className="relative bg-background p-6 rounded-lg shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium mb-4">Create New Group</h3>
              <div className="mb-4">
                <Label htmlFor="group-name">Group Name</Label>
                <Input
                  id="group-name"
                  value={groupName}
                  onChange={handleGroupNameChange}
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div className="mb-4">
                <h4 className="text-medium font-medium mb-2">Choose color</h4>
                <div className="grid grid-cols-6 gap-4">
                  <Button
                    variant={selectedColor === "red" ? "solid" : "outline"}
                    className="bg-red-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("red")}
                  >
                    
                  </Button>
                  <Button
                    variant={selectedColor === "green" ? "solid" : "outline"}
                    className="bg-green-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("green")}
                  >
                
                  </Button>
                  <Button
                    variant={selectedColor === "blue" ? "solid" : "outline"}
                    className="bg-blue-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("blue")}
                  >
                    
                  </Button>
                  <Button
                    variant={selectedColor === "pink" ? "solid" : "outline"}
                    className="bg-pink-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("pink")}
                  >
                    
                  </Button>
                  <Button
                    variant={selectedColor === "purple" ? "solid" : "outline"}
                    className="bg-purple-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("purple")}
                  >
                   
                  </Button>
                  <Button
                    variant={selectedColor === "yellow" ? "solid" : "outline"}
                    className="bg-yellow-500 rounded-full w-12 h-12  flex items-center justify-center"
                    onClick={() => handleColorSelect("yellow")}
                  >
                    
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={handlePopupClose}>
                  Cancel
                </Button>
                <Button className="ml-4" onClick={handleCreateGroup}>
                  Create
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}