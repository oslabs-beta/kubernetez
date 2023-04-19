import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'white',
  color: 'black',
  boxShadow: 24,
  p: 4,
  padding: '10px',
  borderRadius: '5px',
};

export default function Glossary2() {
  const [openCreate, setCreateOpen] = React.useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const helpCreate = `kubectl help create
  Create a resource from a file or from stdin.
  
   JSON and YAML formats are accepted.
  
  Examples:
    # Create a pod using the data in pod.json
    kubectl create -f ./pod.json
    
    # Create a pod based on the JSON passed into stdin
    cat pod.json | kubectl create -f -
    
    # Edit the data in registry.yaml in JSON then create the resource using the edited data
    kubectl create -f registry.yaml --edit -o json
  
  Available Commands:
    clusterrole           Create a cluster role
    clusterrolebinding    Create a cluster role binding for a particular cluster role
    configmap             Create a config map from a local file, directory or literal value
    cronjob               Create a cron job with the specified name
    deployment            Create a deployment with the specified name
    ingress               Create an ingress with the specified name
    job                   Create a job with the specified name
    namespace             Create a namespace with the specified name
    poddisruptionbudget   Create a pod disruption budget with the specified name
    priorityclass         Create a priority class with the specified name
    quota                 Create a quota with the specified name
    role                  Create a role with single rule
    rolebinding           Create a role binding for a particular role or cluster role
    secret                Create a secret using specified subcommand
    service               Create a service using a specified subcommand
    serviceaccount        Create a service account with the specified name
    token                 Request a service account token
  
  Options:
      --allow-missing-template-keys=true:
          If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to
          golang and jsonpath output formats.
  
      --dry-run='none':
          Must be "none", "server", or "client". If client strategy, only print the object that would be sent, without
          sending it. If server strategy, submit server-side request without persisting the resource.
  
      --edit=false:
          Edit the API resource before creating
  
      --field-manager='kubectl-create':
          Name of the manager used to track field ownership.
  
      -f, --filename=[]:
          Filename, directory, or URL to files to use to create the resource
  
      -k, --kustomize='':
          Process the kustomization directory. This flag can't be used together with -f or -R.
  
      -o, --output='':
          Output format. One of: (json, yaml, name, go-template, go-template-file, template, templatefile, jsonpath,
          jsonpath-as-json, jsonpath-file).
  
      --raw='':
          Raw URI to POST to the server.  Uses the transport specified by the kubeconfig file.
  
      -R, --recursive=false:
          Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests
          organized within the same directory.
  
      --save-config=false:
          If true, the configuration of current object will be saved in its annotation. Otherwise, the annotation will
          be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.
  
      -l, --selector='':
          Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2). Matching
          objects must satisfy all of the specified label constraints.
  
      --show-managed-fields=false:
          If true, keep the managedFields when printing objects in JSON or YAML format.
  
      --template='':
          Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format
          is golang templates [http://golang.org/pkg/text/template/#pkg-overview].
  
      --validate='strict':
          Must be one of: strict (or true), warn, ignore (or false). "true" or "strict" will use a schema to validate
          the input and fail the request if invalid. It will perform server side validation if ServerSideFieldValidation
          is enabled on the api-server, but will fall back to less reliable client-side validation if not. "warn" will
          warn about unknown or duplicate fields without blocking the request if server-side field validation is enabled
          on the API server, and behave as "ignore" otherwise. "false" or "ignore" will not perform any schema
          validation, silently dropping any unknown or duplicate fields.
  
      --windows-line-endings=false:
          Only relevant if --edit=true. Defaults to the line ending native to your platform.
  
  Usage:
    kubectl create -f FILENAME [options]`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={handleCreateOpen}>
        "kubectl create" : Create a resource from a file or from stdin
      </Button>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
          ></Typography>
          <Typography
            id='modal-modal-description'
            style={{
              top: '0',
              left: '0',
              overflow: 'scroll',
              height: '100%',
              width: '90',
              zIndex: '1350',
            }}
            sx={{ mt: 2 }}
          >
            <pre>{helpCreate}</pre>
          </Typography>
        </Box>
      </Modal>
      {/* <Button onClick={handleCreateOpen}>Open modal</Button>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
          ></Typography>
          <Typography
            id='modal-modal-description'
            style={{
              top: '0',
              left: '0',
              overflow: 'scroll',
              height: '100%',
              width: '90',
              zIndex: '1350',
            }}
            sx={{ mt: 2 }}
          >
            {helpCreate}
          </Typography>
        </Box>
      </Modal> */}
    </div>
  );
}

// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
// import { Paper } from '@mui/material';
// import Topbar from './Topbar';
// import SideNav from './Sidebar';

// export default function Glossary() {
//   const [createOpen, setCreateOpen] = React.useState(false);
//   const [editOpen, setEditOpen] = React.useState(false);
//   const [runOpen, setRunOpen] = React.useState(false);

//   const handleCreateClose = () => {
//     setCreateOpen(false);
//   };
//   const handleCreateOpen = () => {
//     setCreateOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//   };
//   const handleEditOpen = () => {
//     setEditOpen(true);
//   };

//   const handleRunClose = () => {
//     setRunOpen(false);
//   };
//   const handleRunOpen = () => {
//     setRunOpen(true);
//   };

//   const helpCreate = `kubectl help create
//   Create a resource from a file or from stdin.

//    JSON and YAML formats are accepted.

//   Examples:
//     # Create a pod using the data in pod.json
//     kubectl create -f ./pod.json

//     # Create a pod based on the JSON passed into stdin
//     cat pod.json | kubectl create -f -

//     # Edit the data in registry.yaml in JSON then create the resource using the edited data
//     kubectl create -f registry.yaml --edit -o json

//   Available Commands:
//     clusterrole           Create a cluster role
//     clusterrolebinding    Create a cluster role binding for a particular cluster role
//     configmap             Create a config map from a local file, directory or literal value
//     cronjob               Create a cron job with the specified name
//     deployment            Create a deployment with the specified name
//     ingress               Create an ingress with the specified name
//     job                   Create a job with the specified name
//     namespace             Create a namespace with the specified name
//     poddisruptionbudget   Create a pod disruption budget with the specified name
//     priorityclass         Create a priority class with the specified name
//     quota                 Create a quota with the specified name
//     role                  Create a role with single rule
//     rolebinding           Create a role binding for a particular role or cluster role
//     secret                Create a secret using specified subcommand
//     service               Create a service using a specified subcommand
//     serviceaccount        Create a service account with the specified name
//     token                 Request a service account token

//   Options:
//       --allow-missing-template-keys=true:
//           If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to
//           golang and jsonpath output formats.

//       --dry-run='none':
//           Must be "none", "server", or "client". If client strategy, only print the object that would be sent, without
//           sending it. If server strategy, submit server-side request without persisting the resource.

//       --edit=false:
//           Edit the API resource before creating

//       --field-manager='kubectl-create':
//           Name of the manager used to track field ownership.

//       -f, --filename=[]:
//           Filename, directory, or URL to files to use to create the resource

//       -k, --kustomize='':
//           Process the kustomization directory. This flag can't be used together with -f or -R.

//       -o, --output='':
//           Output format. One of: (json, yaml, name, go-template, go-template-file, template, templatefile, jsonpath,
//           jsonpath-as-json, jsonpath-file).

//       --raw='':
//           Raw URI to POST to the server.  Uses the transport specified by the kubeconfig file.

//       -R, --recursive=false:
//           Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests
//           organized within the same directory.

//       --save-config=false:
//           If true, the configuration of current object will be saved in its annotation. Otherwise, the annotation will
//           be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.

//       -l, --selector='':
//           Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2). Matching
//           objects must satisfy all of the specified label constraints.

//       --show-managed-fields=false:
//           If true, keep the managedFields when printing objects in JSON or YAML format.

//       --template='':
//           Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format
//           is golang templates [http://golang.org/pkg/text/template/#pkg-overview].

//       --validate='strict':
//           Must be one of: strict (or true), warn, ignore (or false). "true" or "strict" will use a schema to validate
//           the input and fail the request if invalid. It will perform server side validation if ServerSideFieldValidation
//           is enabled on the api-server, but will fall back to less reliable client-side validation if not. "warn" will
//           warn about unknown or duplicate fields without blocking the request if server-side field validation is enabled
//           on the API server, and behave as "ignore" otherwise. "false" or "ignore" will not perform any schema
//           validation, silently dropping any unknown or duplicate fields.

//       --windows-line-endings=false:
//           Only relevant if --edit=true. Defaults to the line ending native to your platform.

//   Usage:
//     kubectl create -f FILENAME [options]`;

//   const helpEdit = `kubectl help edit
// Edit a resource from the default editor.

// The edit command allows you to directly edit any API resource you can retrieve via the command-line tools. It will open
// the editor defined by your KUBE_EDITOR, or EDITOR environment variables, or fall back to 'vi' for Linux or 'notepad' for
// Windows. You can edit multiple objects, although changes are applied one at a time. The command accepts file names as
// well as command-line arguments, although the files you point to must be previously saved versions of resources.

// Editing is done with the API version used to fetch the resource. To edit using a specific API version, fully-qualify
// the resource, version, and group.

// The default format is YAML. To edit in JSON, specify "-o json".

// The flag --windows-line-endings can be used to force Windows line endings, otherwise the default for your operating
// system will be used.

// In the event an error occurs while updating, a temporary file will be created on disk that contains your unapplied
// changes. The most common error when updating a resource is another editor changing the resource on the server. When this
// occurs, you will have to apply your changes to the newer version of the resource, or update your temporary saved copy to
// include the latest resource version.

// Examples:
// # Edit the service named 'registry'
// kubectl edit svc/registry

// # Use an alternative editor
// KUBE_EDITOR="nano" kubectl edit svc/registry

// # Edit the job 'myjob' in JSON using the v1 API format
// kubectl edit job.v1.batch/myjob -o json

// # Edit the deployment 'mydeployment' in YAML and save the modified config in its annotation
// kubectl edit deployment/mydeployment -o yaml --save-config

// # Edit the deployment/mydeployment's status subresource
// kubectl edit deployment mydeployment --subresource='status'

// Options:
// --allow-missing-template-keys=true:
// If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to
// golang and jsonpath output formats.

// --field-manager='kubectl-edit':
// Name of the manager used to track field ownership.

// -f, --filename=[]:
// Filename, directory, or URL to files to use to edit the resource

// -k, --kustomize='':
// Process the kustomization directory. This flag can't be used together with -f or -R.

// -o, --output='':
// Output format. One of: (json, yaml, name, go-template, go-template-file, template, templatefile, jsonpath,
// jsonpath-as-json, jsonpath-file).

// --output-patch=false:
// Output the patch if the resource is edited.

// -R, --recursive=false:
// Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests
// organized within the same directory.

// --save-config=false:
// If true, the configuration of current object will be saved in its annotation. Otherwise, the annotation will
// be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.

// --show-managed-fields=false:
// If true, keep the managedFields when printing objects in JSON or YAML format.

// --subresource='':
// If specified, edit will operate on the subresource of the requested object. Must be one of [status]. This flag
// is alpha and may change in the future.

// --template='':
// Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format
// is golang templates [http://golang.org/pkg/text/template/#pkg-overview].

// --validate='strict':
// Must be one of: strict (or true), warn, ignore (or false). "true" or "strict" will use a schema to validate
// the input and fail the request if invalid. It will perform server side validation if ServerSideFieldValidation
// is enabled on the api-server, but will fall back to less reliable client-side validation if not. "warn" will
// warn about unknown or duplicate fields without blocking the request if server-side field validation is enabled
// on the API server, and behave as "ignore" otherwise. "false" or "ignore" will not perform any schema
// validation, silently dropping any unknown or duplicate fields.

// --windows-line-endings=false:
// Defaults to the line ending native to your platform.

// Usage:
// kubectl edit (RESOURCE/NAME | -f FILENAME) [options]`;

//   const helpRun = `kubectl help run
// Create and run a particular image in a pod.

// Examples:
//   # Start a nginx pod
//   kubectl run nginx --image=nginx

//   # Start a hazelcast pod and let the container expose port 5701
//   kubectl run hazelcast --image=hazelcast/hazelcast --port=5701

//   # Start a hazelcast pod and set environment variables "DNS_DOMAIN=cluster" and "POD_NAMESPACE=default" in the
// container
//   kubectl run hazelcast --image=hazelcast/hazelcast --env="DNS_DOMAIN=cluster" --env="POD_NAMESPACE=default"

//   # Start a hazelcast pod and set labels "app=hazelcast" and "env=prod" in the container
//   kubectl run hazelcast --image=hazelcast/hazelcast --labels="app=hazelcast,env=prod"

//   # Dry run; print the corresponding API objects without creating them
//   kubectl run nginx --image=nginx --dry-run=client

//   # Start a nginx pod, but overload the spec with a partial set of values parsed from JSON
//   kubectl run nginx --image=nginx --overrides='{ "apiVersion": "v1", "spec": { ... } }'

//   # Start a busybox pod and keep it in the foreground, don't restart it if it exits
//   kubectl run -i -t busybox --image=busybox --restart=Never

//   # Start the nginx pod using the default command, but use custom arguments (arg1 .. argN) for that command
//   kubectl run nginx --image=nginx -- <arg1> <arg2> ... <argN>

//   # Start the nginx pod using a different command and custom arguments
//   kubectl run nginx --image=nginx --command -- <cmd> <arg1> ... <argN>

// Options:
//     --allow-missing-template-keys=true:
//         If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to
//         golang and jsonpath output formats.

//     --annotations=[]:
//         Annotations to apply to the pod.

//     --attach=false:
//         If true, wait for the Pod to start running, and then attach to the Pod as if 'kubectl attach ...' were called.
//         Default false, unless '-i/--stdin' is set, in which case the default is true. With '--restart=Never' the exit
//         code of the container process is returned.

//     --cascade='background':
//         Must be "background", "orphan", or "foreground". Selects the deletion cascading strategy for the dependents
//         (e.g. Pods created by a ReplicationController). Defaults to background.

//     --command=false:
//         If true and extra arguments are present, use them as the 'command' field in the container, rather than the
//         'args' field which is the default.

//     --dry-run='none':
//         Must be "none", "server", or "client". If client strategy, only print the object that would be sent, without
//         sending it. If server strategy, submit server-side request without persisting the resource.

//     --env=[]:
//         Environment variables to set in the container.

//     --expose=false:
//         If true, create a ClusterIP service associated with the pod.  Requires '--port'.

//     --field-manager='kubectl-run':
//         Name of the manager used to track field ownership.

//     -f, --filename=[]:
//         to use to replace the resource.

//     --force=false:
//         If true, immediately remove resources from API and bypass graceful deletion. Note that immediate deletion of
//         some resources may result in inconsistency or data loss and requires confirmation.

//     --grace-period=-1:
//         Period of time in seconds given to the resource to terminate gracefully. Ignored if negative. Set to 1 for
//         immediate shutdown. Can only be set to 0 when --force is true (force deletion).

//     --image='':
//         The image for the container to run.

//     --image-pull-policy='':
//         The image pull policy for the container.  If left empty, this value will not be specified by the client and
//         defaulted by the server.

//     -k, --kustomize='':
//         Process a kustomization directory. This flag can't be used together with -f or -R.

//     -l, --labels='':
//         Comma separated labels to apply to the pod. Will override previous values.

//     --leave-stdin-open=false:
//         If the pod is started in interactive mode or with stdin, leave stdin open after the first attach completes. By
//         default, stdin will be closed after the first attach completes.

//     -o, --output='':
//         Output format. One of: (json, yaml, name, go-template, go-template-file, template, templatefile, jsonpath,
//         jsonpath-as-json, jsonpath-file).

//     --override-type='merge':
//         The method used to override the generated object: json, merge, or strategic.

//     --overrides='':
//         An inline JSON override for the generated object. If this is non-empty, it is used to override the generated
//         object. Requires that the object supply a valid apiVersion field.

//     --pod-running-timeout=1m0s:
//         The length of time (like 5s, 2m, or 3h, higher than zero) to wait until at least one pod is running

//     --port='':
//         The port that this container exposes.

//     --privileged=false:
//         If true, run the container in privileged mode.

//     -q, --quiet=false:
//         If true, suppress prompt messages.

//     -R, --recursive=false:
//         Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests
//         organized within the same directory.

//     --restart='Always':
//         The restart policy for this Pod.  Legal values [Always, OnFailure, Never].

//     --rm=false:
//         If true, delete the pod after it exits.  Only valid when attaching to the container, e.g. with '--attach' or
//         with '-i/--stdin'.

//     --save-config=false:
//         If true, the configuration of current object will be saved in its annotation. Otherwise, the annotation will
//         be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.

//     --show-managed-fields=false:
//         If true, keep the managedFields when printing objects in JSON or YAML format.

//     -i, --stdin=false:
//         Keep stdin open on the container in the pod, even if nothing is attached.

//     --template='':
//         Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format
//         is golang templates [http://golang.org/pkg/text/template/#pkg-overview].

//     --timeout=0s:
//         The length of time to wait before giving up on a delete, zero means determine a timeout from the size of the
//         object

//     -t, --tty=false:
//         Allocate a TTY for the container in the pod.

//     --wait=false:
//         If true, wait for resources to be gone before returning. This waits for finalizers.

// Usage:
//   kubectl run NAME --image=image [--env="key=value"] [--port=port] [--dry-run=server|client] [--overrides=inline-json]
// [--command] -- [COMMAND] [args...] [options]`;

//   return (
//     <div>
//       {/* -----------------TOP WINDOW BAR --------------------- */}
//       <Topbar
//         position='absolute'
//         top='0'
//         right='0'
//         backgroundColor='#22145a'
//         height='35px'
//         width='100%'
//         marginBottom='5px'
//       />
//       <div
//         style={{
//           display: 'flex',
//           flexStart: 'center',
//           height: '35px',
//           width: '88%',
//           backgroundColor: '#22145a', //#06001b
//           webkitAppRegion: 'drag',
//           webkitUserSelect: 'none',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             backgroundColor: '#22145a', //#06001b
//             webkitAppRegion: 'drag',
//             webkitUserSelect: 'none',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontFamily: 'Roboto',
//             fontSize: '13pt',
//             fontWeight: '500',
//             letterSpacing: '0.5px',
//             paddingLeft: '150px',
//           }}
//         >
//           kaptn
//         </div>
//       </div>
//       {/* -----------------END OF TOP WINDOW BAR --------------------- */}
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//         {/* --------SIDEBAR---------- */}
//         <div style={{ display: 'flex' }}>
//           <SideNav />
//         </div>

//         {/* -----------------GLOSSARY --------------------- */}

//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             padding: '15px',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <div
//             style={{
//               fontSize: '14px',
//               justifyContent: 'center',
//               alignItems: 'center',
//               textAlign: 'center',
//               fontWeight: '900',
//             }}
//           >
//             GLOSSARY <br />
//             (click on any command for more info)
//           </div>
//           <Button
//             onClick={handleCreateOpen}
//             style={{
//               backgroundColor: 'white',
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: '20px',
//             }}
//           >
//             "kubectl create" : Create a resource from a file or from stdin
//           </Button>
//           <Backdrop
//             style={{
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             open={createOpen}
//             onClick={handleCreateClose}
//           >
//             <Paper
//               style={{
//                 height: '90%',
//                 width: '70%',
//                 backgroundColor: 'white',
//                 overflow: 'scroll',
//                 color: 'black',
//                 paddingLeft: '10px',
//               }}
//               color='black'
//             >
//               <div style={{ width: '300px' }}>
//                 <pre style={{ fontFamily: 'Roboto' }}>{helpCreate}</pre>
//               </div>
//             </Paper>
//           </Backdrop>
//           <Button
//             onClick={handleEditOpen}
//             style={{
//               backgroundColor: 'white',
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: '20px',
//             }}
//           >
//             "kubectl expose" : Take a replication controller, service,
//             deployment or pod and expose it as a new Kubernetes service
//           </Button>
//           <Backdrop
//             style={{
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             open={editOpen}
//             onClick={handleEditClose}
//           >
//             <Paper
//               style={{
//                 height: '90%',
//                 width: '70%',
//                 backgroundColor: 'white',
//                 overflow: 'scroll',
//                 color: 'black',
//                 paddingLeft: '10px',
//               }}
//               color='black'
//             >
//               <div style={{ width: '300px' }}>
//                 <pre style={{ fontFamily: 'Roboto' }}>{helpEdit}</pre>
//               </div>
//             </Paper>
//           </Backdrop>

//           <Button
//             onClick={handleRunOpen}
//             style={{
//               backgroundColor: 'white',
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: '20px',
//             }}
//           >
//             "kubectl run": Run a particular image on the cluster
//           </Button>
//           <Backdrop
//             style={{
//               color: '#white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             open={runOpen}
//             onClick={handleRunClose}
//           >
//             <Paper
//               style={{
//                 height: '90%',
//                 width: '70%',
//                 backgroundColor: 'white',
//                 overflow: 'scroll',
//                 color: 'black',
//                 paddingLeft: '10px',
//               }}
//               color='black'
//             >
//               <div style={{ width: '300px' }}>
//                 <pre style={{ fontFamily: 'Roboto' }}>{helpRun}</pre>
//               </div>
//             </Paper>
//           </Backdrop>
//         </div>
//       </div>
//     </div>
//   );
// }